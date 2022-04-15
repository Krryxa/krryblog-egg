import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router, middleware } = app

  router.get('/', controller.home.index)
  // 博客相关（分页查询、查询详情）
  router.resources('blogList', '/blog/list', controller.blog.list)
  // 查询所有博客
  router.get('/blog/getAllBlog', controller.blog.list.getAllBlog)
  // 查询友情链接 or 关于
  router.get('/blog/getLinkOrAbout', controller.blog.list.getLinkOrAbout)
  // 查询博客分类
  router.get('/blog/getClassify', controller.blog.classify.getClassify)
  // 查询博客分类列表
  router.get(
    '/blog/getBlogByClassifyId/:id',
    controller.blog.classify.getClassifyBlog
  )
  // 按标签查询
  router.get('/blog/getBlogByTag', controller.blog.classify.getClassifyBlog)
  // 按关键字查询
  router.get('/blog/getBlogBykeyword', controller.blog.classify.getClassifyBlog)
  // 按 love 查询
  router.get('/blog/getLoveBlog', controller.blog.classify.getClassifyBlog)
  // 查询汇总数据
  router.get('/blog/getSummarizedData', controller.blog.list.getSummarizedData)
  // 查询所有音乐
  router.get('/part/getMusic', controller.part.getMusic)
  // 查询博客更新记录
  router.get('/part/getReviseList', controller.part.getReviseList)

  // 登录接口
  router.post('/part/login', controller.part.login)
  // 登出接口
  router.get('/part/logout', controller.part.logout)

  // 需要校验登录的接口，加载中间件 jwtErr
  const jwtErr = middleware.jwtErr(app.config.jwt)
  // 管理员 - 博客相关（分页查询、查询详情）
  router.resources('adminList', '/krry/list', jwtErr, controller.admin.list)
  // 管理员 - 查询博客总数
  router.get('/krry/getBlogCount', jwtErr, controller.admin.list.getBlogCount)
  // 管理员 - 更新状态、删除、置顶
  router.post('/krry/updateParts', jwtErr, controller.admin.list.updateParts)
  // 管理员 - 上传内容图片
  router.post(
    '/krry/uploadContent/:id',
    jwtErr,
    controller.admin.picture.uploadContent
  )
  // 管理员 - 删除内容图片
  router.post(
    '/krry/deleteContent',
    jwtErr,
    controller.admin.picture.deleteContent
  )
  // 管理员 - 音乐相关
  router.resources('musicList', '/krry/music', jwtErr, controller.admin.music)
  // 管理员 - 用户相关
  router.resources('user', '/krry/user', jwtErr, controller.admin.user)
}
