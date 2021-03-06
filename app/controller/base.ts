import { Controller } from 'egg'
import * as dayjs from 'dayjs'
const fs = require('fs')
const path = require('path')

interface FileNameOption {
  uuid?: Boolean
  fileName?: String
}

export class BaseController extends Controller {
  /**
   * @description: 定义响应格式、状态码
   * @param {*} data
   * @return {*}
   */
  success(data) {
    const { ctx, logger } = this
    try {
      // 设置唯一请求 ID。需要注册 egg-apigw-tracer 插件
      data.requestId = ctx.traceId
      if (data.result) {
        // 具体成功状态码由 controller 或 service 定义
        ctx.body = {
          code: 200,
          message: 'Request successful',
          ...data
        }
      } else if (data.error) {
        // 具体失败状态码由 controller 或 service 定义
        ctx.body = {
          code: data.error.code,
          message: data.error.message,
          ...data
        }
      } else {
        ctx.body = {
          message: 'response format error',
          ...data
        }
        ctx.status = 500 // 设置格式错误状态码
      }
    } catch (err) {
      logger.error('[output response error]: %s', err)
      ctx.body = data
      ctx.status = 500 // 设置通用服务端错误状态码
    }
  }

  /**
   * @description: 静态资源路径
   * @param {*}
   * @return {*}
   */
  publicPath = 'app/public'

  /**
   * @description: 上传文件
   * @param {string} filePath
   * @param {*} fileNameOption：uuid 是否需要 uuid 文件名，fileName 直接传入文件名
   * @return {*}
   */
  async uploadFile(
    filePath: string,
    fileNameOption: FileNameOption = { uuid: false, fileName: '' }
  ) {
    const { ctx } = this

    let response = {}
    try {
      // files[0] 表示获取第一个文件
      const file = ctx.request.files[0]
      // 获取文件基本信息
      const { size, data } = await ctx.helper.getFileInfo(file)
      // 完整路径
      const relativePath = `${this.publicPath}/${filePath}`
      // 判断没有目录就创建
      ctx.helper.mkdirFile(relativePath)
      // 获取后缀名
      const suffix = file.filename.slice(file.filename.indexOf('.'))
      // 判断是否需要 uuid
      const fileName = fileNameOption.uuid
        ? ctx.helper.createUUID(file.filename)
        : fileNameOption.fileName
        ? fileNameOption.fileName + suffix
        : file.filename
      // 写文件
      fs.writeFileSync(path.join(`${relativePath}/${fileName}`), data)
      const createTime = dayjs().format('YYYY-MM-DD').valueOf()

      response = {
        createTime,
        oldName: file.filename,
        title: fileName,
        size: ctx.helper.formatFileSize(size),
        url: `${filePath}/${fileName}`
      }
    } catch (err) {
      response = {
        error: err,
        message: '文件上传失败'
      }
    } finally {
      // 需要删除临时文件
      await ctx.cleanupRequestFiles()
    }
    return response
  }

  /**
   * @description: 删除文件
   * @param {string} filePath
   * @return {*}
   */
  async deleteFile(filePath: string) {
    // 完整路径
    const relativePath = `${this.publicPath}/${filePath}`
    if (fs.existsSync(relativePath)) {
      fs.unlinkSync(relativePath)
      return 'success'
    } else {
      return '文件不存在'
    }
  }
}
