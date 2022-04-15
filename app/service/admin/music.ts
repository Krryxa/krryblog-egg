import { BaseService } from '../base'

/**
 * MusicService Service
 */
export default class MusicService extends BaseService {
  /**
   * @description: 上传音乐，新增一条记录
   * @param {*}
   * @return {*}
   */
  async addMusic(row: { title: string; size: string }) {
    const { Mysql } = this

    const { title, size } = row
    const result: any = await Mysql.insert('music', { title, size })

    return result.affectedRows === 1 ? result.insertId : false
  }

  /**
   * @description: 删除音乐，删除一条记录
   * @param {*}
   * @return {*}
   */
  async deleteMusic(id) {
    const { Mysql } = this

    const result: any = await Mysql.delete('music', { id })

    return result.affectedRows === 1
  }
}
