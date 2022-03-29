import { BaseService } from '../base'

export default class ClassifyService extends BaseService {
  /**
   * @description: 查询博客分类
   * @param {*}
   * @return {*}
   */
  async getClassify() {
    const { Mysql } = this

    const data = await Mysql.select('classify', {
      columns: ['id', 'name']
    })

    return {
      result: { data }
    }
  }
}
