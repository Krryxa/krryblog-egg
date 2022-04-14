const fs = require('fs')
const path = require('path')

type FileSize = string | number

export default {
  /**
   * @description: 参数过滤
   * @param {*}
   * @return {*}
   */
  filterParams: (obj = {}) =>
    Object.keys(obj).reduce((preObj, curKey) => {
      if (
        obj[curKey] !== '' &&
        obj[curKey] != null &&
        obj[curKey] !== undefined
      ) {
        preObj[curKey] = obj[curKey]
      }
      return preObj
    }, {}),

  /**
   * @description: 文件大小格式化
   * @param {*} fileSize
   * @return {*}
   */
  formatFileSize(fileSize) {
    if (fileSize < 1024) {
      return fileSize + 'B'
    } else if (fileSize < 1024 * 1024) {
      let temp: FileSize = fileSize / 1024
      temp = temp.toFixed(2)
      return temp + 'KB'
    } else if (fileSize < 1024 * 1024 * 1024) {
      let temp: FileSize = fileSize / (1024 * 1024)
      temp = temp.toFixed(2)
      return temp + 'MB'
    } else {
      let temp: FileSize = fileSize / (1024 * 1024 * 1024)
      temp = temp.toFixed(2)
      return temp + 'GB'
    }
  },

  /**
   * @description: 若目录不存在，则递归创建目录
   * @param {*} dirname
   * @return {*}
   */
  mkdirFile(dirname) {
    if (fs.existsSync(dirname)) {
      return true
    } else {
      // 查看上一级是否存在
      if (this.mkdirFile(path.dirname(dirname))) {
        fs.mkdirSync(dirname)
        return true
      }
    }
  },

  /**
   * @description: 获取文件信息
   * @param {*} file
   * @return {*}
   */
  async getFileInfo(file): Promise<{ size: string; data: any }> {
    return new Promise((resolve, reject) => {
      fs.readFile(file.filepath, (err, data) => {
        // 读取文件
        if (err) {
          reject(err)
        } else {
          // 获取文件大小
          const size = data.length
          resolve({ size, data })
        }
      })
    })
  }
}
