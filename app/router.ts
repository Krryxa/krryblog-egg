import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  router.get('/', controller.home.index)
  router.resources('blogList', '/blog/list', controller.blog.list)
  router.get('/blog/getClassify', controller.blog.classify.getClassify)
}
