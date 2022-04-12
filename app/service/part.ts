import { BaseService } from './base'

export default class PartService extends BaseService {
  /**
   * @description: 查询所有音乐
   * @param {*}
   * @return {*}
   */
  async getMusic(pageParams = {}) {
    const { Mysql } = this

    const pageList = Object.keys(pageParams).length
      ? this.handlePageParams(pageParams)
      : []
    if (pageList.length) {
      pageParams = {
        limit: pageList[1],
        offset: pageList[0]
      }
    }
    const data = await Mysql.select('music', {
      columns: ['id', 'title', 'size', 'createTime'],
      orders: [['id', 'desc']],
      ...pageParams
    })
    this.handleTime(data, ['createTime'])

    const musicLen = await Mysql.count('music', {})

    return {
      result: { data, musicLen }
    }
  }

  /**
   * @description: 查询博客更新记录
   * @param {*}
   * @return {*}
   */
  async getReviseList() {
    const { Mysql } = this

    const data = await Mysql.select('revise', {
      columns: ['id', 'title', 'createTime', 'remark'],
      orders: [['id', 'desc']]
    })
    this.handleTime(data, ['createTime'])

    return {
      result: { data }
    }
  }

  /**
   * @description: 登录
   * @param {*}
   * @return {*}
   */
  async login(reqData) {
    const { Mysql, app, ctx } = this
    const user = await Mysql.get('user', { name: reqData.name })

    let message = 'success'
    let id = 'no'
    if (user) {
      if (user.password === reqData.password) {
        // 生成 token
        const token = app.jwt.sign(
          {
            username: reqData.name // 保存的用户数据，可通过 ctx.state.user 获取
          },
          app.config.jwt.secret, // 根据设置的秘钥生成
          {
            expiresIn: 60 * 60 * 24 + 's' // 设置过期时间 24 小时
          }
        )
        id = user.id
        ctx.cookies.set('token', token) // 登录态放到 cookie
      } else {
        message = 'The password is wrong~'
      }
    } else {
      message = 'The username does not exist~'
    }

    return {
      message,
      result: id
    }
  }
}
