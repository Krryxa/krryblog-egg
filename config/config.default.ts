import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'
const fs = require('fs')
const path = require('path')

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1648105828560_3558'

  // add your egg config in here
  // 由于 nginx 开启了更好的 Brotli 压缩，这里不用注册 gzip 中间件
  config.middleware = ['errorHandler']

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,

    // 配置 gzip 中间件的配置
    // gzip: {
    //   threshold: 1024 // 小于 1k 的响应体不压缩
    // },

    // 由于 nginx 开启了更好的 Brotli 压缩，这里不用配置
    // 配置静态资源的 gzip
    static: {
      // gzip: true
      prefix: '/' // 静态资源路径前缀，默认是 public，由于文章内容图片是绝对地址，没有 public，所以这里设置成 /
    },

    tracer: {
      mode: 'uuid'
    },

    jwt: {
      secret: 'krryxq123456'
    },

    multipart: {
      mode: 'file',
      fileSize: '20mb',
      fileExtensions: ['.avif'] // 增加对 avif 扩展名的文件支持
    },

    view: {
      defaultViewEngine: 'nunjucks',
      mapping: {
        '.html': 'nunjucks'
      }
    },

    siteFile: {
      '/favicon.ico': fs.readFileSync(
        path.join(__dirname, '../app/public/favicon.ico')
      )
    }
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig
  }
}
