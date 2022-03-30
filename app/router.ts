import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

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
  // 查询所有音乐
  router.get('/part/getMusic', controller.part.getMusic)
  // 查询博客更新记录
  router.get('/part/getReviseList', controller.part.getReviseList)
}
