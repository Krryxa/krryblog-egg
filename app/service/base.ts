import { Service } from 'egg'

// 由于官方 egg-mysql 定义的类型缺少部分函数，需要手动加上
// 先获取原本类型，再继承
// type BaseMysql = typeof this.app.mysql
// 发现可直接读取 EggMySQL 类型
interface MysqlType extends EggMySQL {
  count: (table: string, values: object) => Promise<number>
  get: any
}

/**
 * BaseService Service
 */
export class BaseService extends Service {
  /**
   * @description: 重新定义 mysql 类型
   * @param {*}
   * @return {*}
   */
  getMysql = () => {
    return this.app.mysql as MysqlType
  }

  /**
   * @description: 获取 mysql 实例
   */
  Mysql = this.getMysql()

  /**
   * @description: 对象转变 query 语句
   * @param {*} condition 查询条件
   * @param {*} alias 表的别名
   * @return {*}
   */
  parseQueryCondition(condition, alias = '') {
    alias = alias ? alias + '.' : ''
    return Object.entries(condition)
      .map((ele) => `${alias}${ele[0]} = ${ele[1]}`)
      .join(' and ')
  }

  /**
   * @description: 处理时间，去除时分秒
   * @param {*} data
   * @return {*}
   */
  handleTime(data: any[], keyList) {
    data.forEach((ele: any) => {
      keyList.forEach((key) => (ele[key] = ele[key].split(' ')[0]))
    })
  }

  /**
   * @description: 处理分页参数
   * @param {*} params
   * @return {*}
   */
  handlePageParams(params) {
    return [(+params.pageNo - 1) * params.pageSize, +params.pageSize]
  }

  /**
   * @description: 查询博客配置
   * @param {*}
   * @return {*}
   */
  async getConfig() {
    const { Mysql } = this

    const data = await Mysql.get('config', { id: 1 })

    return data
  }
}
