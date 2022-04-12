import { BaseService } from '../base'
import { commonColumn } from '../../const'

/**
 * ListService Service
 */
export default class ListService extends BaseService {
  /**
   * 分页查询所有博客，发布和未发布
   * @param blog - blog info
   */
  async getBlog(params) {
    const { Mysql } = this

    const data = (await Mysql.query(
      `select
        b.id,
        u.name as userName,
			  c.name as classify,
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
        isDelete = 0
      order by
        b.id desc
      limit ?,?`,
      this.handlePageParams(params)
    )) as EggMySQLSelectResult
    // 处理时间，只保留年月日
    this.handleTime(data, ['createTime', 'updateTime'])
    const blogLen = await Mysql.count('blog', {
      isDelete: 0
    })

    return {
      result: { data, blogLen }
    }
  }

  /**
   * @description: 更新博客其他信息（更新发布状态、是否删除、是否置顶）
   * @param {*}
   * @return {*}
   */
  async updateBlog(blog) {
    const { Mysql, ctx } = this

    // 只取下面三个参数，并过滤，保证此方法只更新发布状态、是否删除、是否置顶
    const { id, status, isDelete, isTop } = blog
    const reqData = ctx.helper.filterParams({
      id,
      status,
      isDelete,
      isTop
    })
    const result = await Mysql.update('blog', reqData)
    return result.affectedRows === 1 ? blog : false
  }
}
