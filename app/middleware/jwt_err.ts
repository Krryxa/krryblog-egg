// 封装 jwt 中间件
export default (options) => {
  return async function jwtErr(ctx, next) {
    const token = ctx.request.header.authorization
    const body = {
      code: 401,
      requestId: ctx.traceId
    }
    if (token) {
      try {
        // 解码 token，格式是 'Bearer ${token}'，split 获取 token
        const decode = ctx.app.jwt.verify(token.split(' ')[1], options.secret)
        console.log('decode：', decode)
        // 查看 cookie 是否有 token
        if (!ctx.cookies.get('token')) {
          throw {
            message: '没有登录态'
          }
        }
        await next()
      } catch (error: any) {
        ctx.status = 401
        ctx.body = {
          ...body,
          message: error.message
        }
      }
    } else {
      ctx.status = 401
      ctx.body = {
        ...body,
        message: '请您先登录'
      }
    }
  }
}
