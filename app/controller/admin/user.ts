import { BaseController } from '../base'

/**
 * @description: 需要检验登录态的接口
 * @param {*}
 * @return {*}
 */
export default class UserController extends BaseController {
  /**
   * @description: put 请求：更新数据
   * @param {*}
   * @return {*}
   */
  async update() {
    const { ctx } = this
    ctx.validate(
      {
        id: { type: 'number', required: true },
        name: { type: 'string', required: true },
        originWord: { type: 'string', required: false },
        password: { type: 'string', required: false }
      },
      ctx.request.body
    )
    const { id, name, originWord, password } = ctx.request.body
    const reqData = ctx.helper.filterParams({
      id,
      name,
      originWord,
      password
    })
    const msg = await ctx.service.admin.user.update(reqData)
    if (msg === 'success') {
      // 设置 cookie
      ctx.cookies.set('username', name, {
        httpOnly: false
      })
    }
    ctx.body = msg
  }

  /**
   * @description: 更新用户配置
   * @param {*}
   * @return {*}
   */
  async updateConfig() {
    const { ctx } = this

    const result = await ctx.service.admin.user.updateConfig(ctx.request.body)

    this.success({ result })
  }
}
