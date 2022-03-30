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
}
