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

  /**
   * @description: 按分类、标签、关键字、love 查询
   * @param {*}
   * @return {*}
   */
  async getClassifyBlog() {
    const { ctx } = this
    ctx.validate(
      {
        pageNo: { type: 'string', format: /\d+/, required: false },
        pageSize: { type: 'string', format: /\d+/, required: false },
        tag: { type: 'string', required: false },
        keyword: { type: 'string', required: false }
      },
      ctx.query
    )
    const { pageNo, pageSize, tag, keyword } = ctx.query
    const reqData = ctx.helper.filterParams({
      pageNo,
      pageSize,
      id: ctx.params.id,
      tag,
      keyword
    })

    const BlogInfo = await ctx.service.blog.classify.getClassifyBlog(reqData)
    this.success(BlogInfo)
  }
}
