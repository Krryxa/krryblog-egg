import { EggPlugin } from 'egg'

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },

  // 参数校验
  validate: {
    enable: true,
    package: 'egg-validate'
  },

  // 生成 requestId
  tracer: {
    enable: true,
    package: 'egg-apigw-tracer'
  },

  mysql: {
    enable: true,
    package: 'egg-mysql'
  },

  jwt: {
    enable: true,
    package: 'egg-jwt'
  },

  // view 模板渲染
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks'
  },

  // 接入阿里 nodejs 性能平台
  alinode: {
    enable: true,
    package: 'egg-alinode',
  }
}

export default plugin
