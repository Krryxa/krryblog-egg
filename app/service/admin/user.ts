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
    const user = await Mysql.get('user', { id: params.id })
    const updateParams: UserType = { id: params.id, name: params.name }
    if (params.originWord) {
      // 更新密码
      if (params.originWord === user.password) {
        updateParams.password = params.password
      } else {
        return 'Incorrect input of original password'
      }
    }
    const result = await Mysql.update('user', updateParams)
    return result.affectedRows === 1 ? 'success' : 'fail to modify'
  }
}
