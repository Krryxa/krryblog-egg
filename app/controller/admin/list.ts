import { BaseController } from '../base'
import * as dayjs from 'dayjs'

// const blogFields = [
//   'userId',
//   'title',
//   'content_md',
//   'content_hm',
//   'description',
//   'imageName',
//   'image',
//   'classifyId',
//   'label',
//   'status',
//   'isLove'
// ]

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

    const BlogInfo = await ctx.service.admin.list.getBlogDetail(ctx.params.id)

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
    // 只取下面三个参数，并过滤，保证此方法只更新发布状态、是否删除、是否置顶
    const { id, status, isDelete, isTop } = ctx.request.body
    const reqData = ctx.helper.filterParams({
      id,
      status,
      isDelete,
      isTop
    })
    const blog = await ctx.service.admin.list.updateBlog(reqData)

    ctx.body = blog ? 'success' : '更新失败'
  }

  /**
   * @description: post 请求：新增数据
   * @param {*}
   * @return {*}
   */
  async create() {
    const { ctx } = this

    const reqData = this.blogValidate()
    const result = await ctx.service.admin.list.addBlog(reqData)

    ctx.body = result
  }

  /**
   * @description: put 请求：更新数据。请求 url 需要在后面附带唯一 ID：http://127.0.0.1:7001/blog/1
   * @param {*}
   * @return {*}
   */
  async update() {
    const { ctx } = this

    const reqData = this.blogValidate()
    // 获取当前时间
    const updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss').valueOf()
    reqData.id = ctx.params.id
    reqData.updateTime = updateTime
    const result = await ctx.service.admin.list.updateBlog(reqData)

    ctx.body = result ? 'success' : '更新失败'
  }

  /**
   * @description: 新增、修改博客通用校验
   * @param {*}
   * @return {*}
   */
  blogValidate() {
    const { ctx } = this

    ctx.validate(
      {
        userId: { type: 'number', required: true },
        title: { type: 'string', required: true },
        content_md: { type: 'string', required: true },
        content_hm: { type: 'string', required: true },
        description: { type: 'string', required: true },
        imageName: { type: 'string', required: true },
        image: { type: 'string', required: true },
        classifyId: { type: 'number', required: true },
        label: { type: 'string', required: false },
        status: { type: 'number', required: true },
        isLove: { type: 'number', required: true }
      },
      ctx.request.body
    )
    return ctx.request.body
  }

  /**
   * @description: 获取博客总数（发布和未发布）
   * @param {*}
   * @return {*}
   */
  async getBlogCount() {
    const { ctx } = this

    const count = await ctx.service.admin.list.getBlogCount()
    ctx.body = count
  }
}
