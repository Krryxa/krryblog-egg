import { BaseController } from '../base'

/**
 * @description: 需要检验登录态的接口
 * @param {*}
 * @return {*}
 */
export default class PictureController extends BaseController {
  /**
   * @description: 内容图片上传
   * @param {*}
   * @return {*}
   */
  async uploadContent() {
    const { ctx } = this

    // upload/content/130
    const res: any = await this.uploadFile(`upload/content/${ctx.params.id}`)
    ctx.body = res
  }

  /**
   * @description: 删除内容图片
   * @param {*}
   * @return {*}
   */
  async deleteContent() {
    const { ctx } = this

    ctx.validate(
      {
        filePath: { type: 'string', required: true }
      },
      ctx.request.body
    )

    let msg = await this.deleteFile(ctx.request.body.filePath)

    ctx.body = msg
  }

  /**
   * @description: 封面图片上传
   * @param {*}
   * @return {*}
   */
  async uploadCover() {
    const { ctx } = this

    // upload/cover/130.webp
    const res: any = await this.uploadFile(`upload/cover`, {
      fileName: ctx.params.id
    })
    ctx.body = res
  }

  /**
   * @description: 删除封面图片
   * @param {*}
   * @return {*}
   */
  async deleteCover() {
    const { ctx } = this

    ctx.validate(
      {
        filePath: { type: 'string', required: true },
        isBackup: { type: 'boolean', required: false }
      },
      ctx.request.body
    )

    let msg = await this.deleteFile(ctx.request.body.filePath)
    if (msg === 'success' && Number(ctx.params.id)) {
      // 如果删除成功，且是编辑博客(id > 0)，调用 sql 删除对应的图片地址
      const reqData = ctx.request.body.isBackup
        ? { imageWebp: '' }
        : { imageName: '', image: '' }
      await ctx.service.admin.list.updateBlog({
        id: ctx.params.id,
        ...reqData
      })
    }

    ctx.body = msg
  }
}
