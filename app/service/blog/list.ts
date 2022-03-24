import { Service } from 'egg'
import { commonColumn } from '../../const'

/**
 * BlogService Service
 */
export default class ListService extends Service {
  /**
   * 根据主键查询一条数据
   * @param blog - blog info
   */
  async getBlogById(id) {
    console.log(id)
    // mysql 查询
    // const result = await this.app.mysql.select('blogs', {
    //   where: { id }
    // })
    const result = { title: '测试数据' }

    return { result }
  }

  /**
   * 查询列表
   * @param blog - blog info
   */
  async getBlog(params) {
    // mysql 分页查询
    const result = await this.app.mysql.select('blog', {
      limit: +params.pageSize, // 返回数据量
      offset: (+params.pageNo - 1) * params.pageSize, // 数据偏移量
      columns: commonColumn,
      orders: [
        ['isTop', 'desc'],
        ['id', 'desc']
      ] // 排序方式
    })

    return { result }
  }
}
