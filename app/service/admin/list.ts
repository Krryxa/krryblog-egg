import { BaseService } from '../base'
import { commonColumn } from '../../const'
import * as dayjs from 'dayjs'

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
   * @description: 更新博客
   * @param {*}
   * @return {*}
   */
  async updateBlog(blog) {
    const { Mysql } = this

    const result = await Mysql.update('blog', blog)
    return result.affectedRows === 1 ? blog : false
  }

  /**
   * @description: 新增博客
   * @param {*} blog
   * @return {*}
   */
  async addBlog(blog) {
    const { Mysql } = this

    // 获取当前时间
    const createTime = dayjs().format('YYYY-MM-DD HH:mm:ss').valueOf()
    blog = Object.assign({}, blog, {
      hit: 0,
      comment: 0,
      createTime,
      updateTime: createTime,
      isDelete: 0,
      isTop: 0
    })
    const result: any = await Mysql.insert('blog', blog)

    return result.affectedRows === 1 ? result.insertId : false
  }

  /**
   * @description: 获取博客总数（发布和未发布）
   * @param {*}
   * @return {*}
   */
  async getBlogCount() {
    const { Mysql } = this

    const blogLen = await Mysql.count('blog', {})
    return blogLen
  }
}
