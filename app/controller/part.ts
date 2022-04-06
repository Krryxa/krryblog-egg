import { BaseController } from './base'

export default class PartController extends BaseController {
  /**
   * @description: 获取所有音乐
   * @param {*}
   * @return {*}
   */
  async getMusic() {
    const { ctx } = this

    const result = await ctx.service.part.getMusic()
    this.success(result)
  }

  /**
   * @description: 获取博客更新记录
   * @param {*}
   * @return {*}
   */
  async getReviseList() {
    const { ctx } = this

    const result = await ctx.service.part.getReviseList()
    this.success(result)
  }

  /**
   * @description: 登录
   * @param {*}
   * @return {*}
   */
  async login() {
    const { ctx } = this

    ctx.validate(
      {
        name: { type: 'string', required: true },
        password: { type: 'string', required: true }
      },
      ctx.request.body
    )
    const { name, password } = ctx.request.body

    const result = await ctx.service.part.login({ name, password })
    this.success(result)
  }
}
