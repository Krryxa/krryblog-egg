import { BaseService } from '../base'
import { commonColumn, publishedCondition } from '../../const'

// 找出不需要关联查询的，采用普通select方法。比如时间归档的接口不需要关联查询

/**
 * ListService Service
 */
export default class ListService extends BaseService {
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

    const { Mysql } = this

    const data = await Mysql.query(
      `select
        b.id,
        c.name as classify,
        ${commonColumn.join(',')}
      from
        blog b
      left join
        classify c
      on
        b.classifyId = c.id
      where
      ${this.parseQueryCondition(publishedCondition, 'b')}
      and
        b.isLove = 0
      order by
        b.isTop desc,
        b.id desc
      limit ?,?`,
      [(+params.pageNo - 1) * params.pageSize, +params.pageSize]
    )
    const blogLen = await Mysql.count('blog', {
      ...publishedCondition,
      isLove: 0
    })

    return {
      result: { data, blogLen }
    }
  }
}
