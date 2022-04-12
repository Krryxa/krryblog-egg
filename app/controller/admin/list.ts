import { BaseController } from '../base'

/**
 * @description: 需要检验登录态的接口
 * @param {*}
 * @return {*}
 */
export default class ListController extends BaseController {
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
    const BlogInfo = await ctx.service.admin.list.getBlog(reqData)
    this.success(BlogInfo)
  }

  /**
   * @description: 请求：更新博客其他信息（更新发布状态、是否删除、是否置顶）
   * 客户端要携带 csrftoken
   * @param {*}
   * @return {*}
   */
  async updateParts() {
    const { ctx } = this
    ctx.validate(
      {
        id: { type: 'number', required: true },
        status: { type: 'number', required: false },
        isDelete: { type: 'number', required: false },
        isTop: { type: 'number', required: false }
      },
      ctx.request.body
    )

    const blog = await ctx.service.admin.list.updateBlog(ctx.request.body)

    ctx.body = blog ? 'success' : false
  }

  /**
   * @description: post 请求：新增数据
   * @param {*}
   * @return {*}
   */
  async create() {}

  /**
   * @description: put 请求：更新数据。请求 url 需要在后面附带唯一 ID：http://127.0.0.1:7001/blog/1
   * @param {*}
   * @return {*}
   */
  async update() {}

  /**
   * @description: DELETE 请求：删除数据。请求 url 需要在后面附带唯一 ID：http://127.0.0.1:7001/blog/1
   * @param {*}
   * @return {*}
   */
  async destroy() {}
}
