import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  router.get('/', controller.home.index)
  // 博客相关（分页查询、查询详情）
  router.resources('blogList', '/blog/list', controller.blog.list)
  // 查询博客分类
  router.get('/blog/getClassify', controller.blog.classify.getClassify)
  // 查询博客分类列表
  router.get(
    '/blog/getBlogByClassifyId/:id',
    controller.blog.classify.getClassifyBlog
  )
  // 查询所有音乐
  router.get('/part/getMusic', controller.part.getMusic)
}
