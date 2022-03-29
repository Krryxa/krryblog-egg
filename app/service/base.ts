import { Service } from 'egg'

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
    // 由于官方 egg-mysql 定义的类型缺少部分函数，需要手动加上
    // 先获取原本类型，再继承
    type BaseMysql = typeof this.app.mysql
    interface MysqlType extends BaseMysql {
      count: (table: string, values: object) => Promise<number>
      get: any
    }
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
}
