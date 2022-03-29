import { BaseService } from './base'

export default class PartService extends BaseService {
  /**
   * @description: 查询所有音乐
   * @param {*}
   * @return {*}
   */
  async getMusic() {
    const { Mysql } = this

    const data = await Mysql.select('music', {
      columns: ['id', 'title', 'size', 'createTime'],
      orders: [['id', 'desc']]
    })
    this.handleTime(data, ['createTime'])

    const musicLen = await Mysql.count('music', {})

    return {
      result: { data, musicLen }
    }
  }
}
