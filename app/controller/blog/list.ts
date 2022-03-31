import { BaseController } from '../base'

export default class ListController extends BaseController {
  /**
   * @description: get 请求：获取列表
   * @param {*}
   * @return {*}
   */
  async index() {
    const { ctx } = this

    // 参数校验，需要注册 egg-validate 插件
    ctx.validate(
      {
        pageNo: { type: 'string', format: /\d+/, required: false },
        pageSize: { type: 'string', format: /\d+/, required: false }
      },
      ctx.query
    )
    const { pageNo, pageSize } = ctx.query
    // 过滤空参数，需要定义框架的扩展：helper.filterParams 方法
    const reqData = ctx.helper.filterParams({
      pageNo,
      pageSize
    })
    // 在 service 层做数据处理
    const BlogInfo = await ctx.service.blog.list.getBlog(reqData)
    // 统一格式返回
    this.success(BlogInfo)
  }

  /**
   * @description: get 请求：根据 id 获取数据
   * @param {*}
   * @return {*}
   */
  async show() {
    const { ctx } = this
    ctx.validate(
      {
        id: { type: 'string', format: /\d+/, required: true }
      },
      ctx.params
    )
    const reqData = {
      key: 'id',
      value: ctx.params.id
    }
    const BlogInfo = await ctx.service.blog.list.getBlogByOnly(reqData)

    this.success(BlogInfo)
  }

  /**
   * @description: 查询所有博客
   * @param {*}
   * @return {*}
   */
  async getAllBlog() {
    const { ctx } = this
    ctx.validate(
      {
        type: { type: 'string', required: true }
      },
      ctx.query
    )
    const { type } = ctx.query
    const BlogInfo = await ctx.service.blog.list.getAllBlog(type)

    this.success(BlogInfo)
  }

  /**
   * @description: 友情链接 or 关于
   * @param {*}
   * @return {*}
   */
  async getLinkOrAbout() {
    const { ctx } = this
    ctx.validate(
      {
        title: { type: 'string', required: true }
      },
      ctx.query
    )
    const reqData = {
      key: 'title',
      value: ctx.query.title
    }
    const BlogInfo = await ctx.service.blog.list.getBlogByOnly(reqData, false)

    this.success(BlogInfo)
  }

  /**
   * @description: 查询汇总数据
   * @param {*}
   * @return {*}
   */
  async getSummarizedData() {
    const { ctx } = this

    const result = await ctx.service.blog.list.getSummarizedData()

    this.success(result)
  }

  /**
   * @description: put 请求：更新博客其他信息（不校验登录态，更新点击量、评论数）
   * @param {*}
   * @return {*}
   */
  async update() {}
}
