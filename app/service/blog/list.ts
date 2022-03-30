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
    const { Mysql } = this

    const data = await Mysql.query(
      `select
        b.id,
        u.name as userName,
        c.name as classify,
        b.content_hm,
        ${commonColumn.join(',')}
      from
        blog b
      left join
			  user u
		  on
        b.userId = u.id
      left join
        classify c
      on
        b.classifyId = c.id
      where
      ${this.parseQueryCondition(publishedCondition, 'b')}
      and
        b.id = ?`,
      [id]
    )
    this.increasementHit(data)

    return {
      code: Object.keys(data).length ? 0 : 404,
      result: { data: data?.[0] }
    }
  }

  /**
   * 查询列表
   * @param blog - blog info
   */
  async getBlog(params) {
    const { Mysql } = this

    const data = (await Mysql.query(
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
      this.handlePageParams(params)
    )) as EggMySQLSelectResult
    // 处理时间，只保留年月日
    this.handleTime(data, ['createTime', 'updateTime'])
    const blogLen = await Mysql.count('blog', {
      ...publishedCondition,
      isLove: 0
    })

    return {
      result: { data, blogLen }
    }
  }

  /**
   * 查询所有博客
   * @param blog - blog info
   */
  async getAllBlog(type) {
    const { Mysql } = this

    const isTop = type === 'YES' ? [['isTop', 'desc']] : []

    const data = await Mysql.select('blog', {
      columns: ['id', ...commonColumn.map((ele) => ele.slice(2))],
      where: publishedCondition,
      orders: isTop.concat([['id', 'desc']]) as [
        string,
        'desc' | 'asc' | 'DESC' | 'ASC'
      ][]
    })
    // 处理时间，只保留年月日
    this.handleTime(data, ['createTime', 'updateTime'])

    return {
      result: { data }
    }
  }

  /**
   * 根据 title 查询博客
   * @param blog - blog info
   */
  async getBlogByTitle(title) {
    const { Mysql } = this

    const data = await Mysql.query(
      `select
        b.id,
        u.name as userName,
        c.name as classify,
        b.content_hm,
        ${commonColumn.join(',')}
      from
        blog b
      left join
			  user u
		  on
        b.userId = u.id
      left join
        classify c
      on
        b.classifyId = c.id
      where
        b.title = ?`,
      [title]
    )
    this.increasementHit(data)

    return {
      code: Object.keys(data).length ? 0 : 404,
      result: { data: data?.[0] }
    }
  }

  /**
   * @description: 访问量 +1
   * @param {*}
   * @return {*}
   */
  async increasementHit(data) {
    const notEmpty = !!Object.keys(data).length
    if (notEmpty) {
      data[0].hit++
      const blog = {
        id: data[0].id,
        hit: data[0].hit
      }
      this.updateBlog(blog)
    }
  }

  /**
   * @description: 更新博客其他信息（不校验登录态，更新点击量、评论数）
   * @param {*}
   * @return {*}
   */
  async updateBlog(blog) {
    const { Mysql, ctx } = this

    // 只取下面三个参数，并过滤，保证此方法只更新点击量、评论数
    const { id, hit, comment } = blog
    const reqData = ctx.helper.filterParams({
      id,
      hit,
      comment
    })
    const result = await Mysql.update('blog', reqData)
    return result.affectedRows === 1
  }
}
