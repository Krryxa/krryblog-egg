import { BaseController } from '../base'

export default class ClassifyController extends BaseController {
  /**
   * @description: 获取博客分类
   * @param {*}
   * @return {*}
   */
  async getClassify() {
    const { ctx } = this

    const result = await ctx.service.blog.classify.getClassify()
    this.success(result)
  }
}
