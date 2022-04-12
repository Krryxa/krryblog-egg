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
