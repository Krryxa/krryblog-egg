import { BaseController } from '../base'

/**
 * @description: 需要检验登录态的接口
 * @param {*}
 * @return {*}
 */
export default class MusicController extends BaseController {
  /**
   * @description: get 请求：查询列表
   * @param {*}
   * @return {*}
   */
  async index() {
    const { ctx } = this

    ctx.validate(
      {
        pageNo: { type: 'string', format: /\d+/, required: false },
        pageSize: { type: 'string', format: /\d+/, required: false }
      },
      ctx.query
    )
    const { pageNo, pageSize } = ctx.query
    const reqData = ctx.helper.filterParams({
      pageNo,
      pageSize
    })
    const BlogInfo = await ctx.service.part.getMusic(reqData)
    this.success(BlogInfo)
  }

  /**
   * @description: post 请求：新增数据
   * @param {*}
   * @return {*}
   */
  async create() {
    const { ctx } = this

    const res: any = await this.uploadFile('music')
    if (!res.error) {
      // 上传成功，写入数据库
      const id = await ctx.service.admin.music.addMusic(res)
      if (id) {
        res.id = id
      } else {
        res.message = '数据库更新失败'
      }
    }
    ctx.body = res
  }

  /**
   * @description: DELETE 请求：删除数据
   * @param {*}
   * @return {*}
   */
  async destroy() {
    const { ctx } = this

    ctx.validate(
      {
        filePath: { type: 'string', required: true }
      },
      ctx.request.body
    )

    let msg = await this.deleteFile(ctx.request.body.filePath)
    if (msg === 'success') {
      // 写入数据库
      const result = await ctx.service.admin.music.deleteMusic(ctx.params.id)
      if (!result) {
        msg = '数据库更新失败'
      }
    }
    ctx.body = msg
  }
}
