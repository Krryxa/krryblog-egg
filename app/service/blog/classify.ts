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
   * 按分类、标签、关键字、love 查询
   * @param blog - blog info
   */
  async getClassifyBlog(params) {
    const { Mysql, ctx } = this

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
      ${this.getWhereCondition(params)}
      and
      ${this.parseQueryCondition(publishedCondition, 'b')}
      order by
        b.id desc
      limit ?,?`,
      this.handlePageParams(params)
    )) as EggMySQLSelectResult
    // 处理时间，只保留年月日
    this.handleTime(data, ['createTime', 'updateTime'])
    const len = await Mysql.query(
      `select
        count(*) as blogLen
      from
        blog b
      left join
        classify c
      on
        b.classifyId = c.id
      where
      ${this.getWhereCondition(params)}
      and
      ${this.parseQueryCondition(publishedCondition)}`
    )
    const blogLen = len[0].blogLen

    // 查询博客配置
    const config = await this.getConfig()

    const code = data.length
      ? 200
      : ctx.originalUrl.includes('getBlogBykeyword')
      ? 406
      : 404

    return {
      code,
      result: {
        data,
        blogLen,
        config
      }
    }
  }

  /**
   * @description: 根据参数转换 where 条件
   * @param {*}
   * @return {*}
   */
  getWhereCondition(params) {
    switch (true) {
      case Reflect.has(params, 'id'):
        return `b.classifyId = ${params.id} and b.isLove = 0`
      case Reflect.has(params, 'tag'):
        return `b.label regexp '^${params.tag}$|^${params.tag},|,${params.tag}$|,${params.tag},' and b.isLove = 0`
      case Reflect.has(params, 'keyword'):
        return `(
          b.title LIKE '%${params.keyword}%'
          or b.description like '%${params.keyword}%'
          or b.label like '%${params.keyword}%'
          or c.name like '%${params.keyword}%'
        ) and b.isLove = 0`
      default:
        return 'b.isLove = 1'
    }
  }
}
