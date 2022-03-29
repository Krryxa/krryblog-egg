import { BaseService } from '../base'
import { commonColumn, publishedCondition } from '../../const'

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

  /**
   * 查询分类列表
   * @param blog - blog info
   */
  async getClassifyBlog(params) {
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
        b.classifyId = ?
      and
      ${this.parseQueryCondition(publishedCondition, 'b')}
      and
        b.isLove = 0
      order by
        b.id desc
      limit ?,?`,
      [params.id, (+params.pageNo - 1) * params.pageSize, +params.pageSize]
    )
    const blogLen = await Mysql.count('blog', {
      ...publishedCondition,
      isLove: 0,
      classifyId: params.id
    })
    const category = await Mysql.get('classify', { id: params.id })

    return {
      code: category ? 0 : 404,
      result: {
        data,
        blogLen,
        categoryName: category?.name
      }
    }
  }
}
