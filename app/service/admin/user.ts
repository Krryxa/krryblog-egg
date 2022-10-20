import { BaseService } from '../base'

interface UserType {
  id: number
  name: string
  password?: string
}

/**
 * UserService Service
 */
export default class UserService extends BaseService {
  /**
   * @description: 更新用户信息
   * @param {*} params
   * @return {*}
   */
  async update(params) {
    const { Mysql } = this
    const updateParams: UserType = { id: params.id, name: params.name }
    if (params.originWord) {
      // 更新密码 先查询当前用户信息
      const user = await Mysql.get('user', { id: params.id })
      if (params.originWord === user.password) {
        updateParams.password = params.password
      } else {
        return 'Incorrect input of original password'
      }
    }
    const result = await Mysql.update('user', updateParams)
    return result.affectedRows === 1 ? 'success' : 'fail to modify'
  }

  /**
   * @description: 更新博客配置
   * @param {*}
   * @return {*}
   */
  async updateConfig(config) {
    const { Mysql } = this

    const result = await Mysql.update('config', config)

    return result.affectedRows === 1
  }
}
