/**
 * 捕捉 koa 异常的中间件
 * 根据 header.accept 类型返回适合的数据
 */

import Koa from 'koa';

export interface CatchThrowMiddlewareOptions {
  enable?: boolean
}

// eslint-disable-next-line max-len
export default (opts: CatchThrowMiddlewareOptions = {}) => async (ctx: Koa.Context, next: Koa.Next) => {
  const { CATCH_THROW_ENABLE } = process.env;
  const { enable = CATCH_THROW_ENABLE } = opts;
  if (enable) {
    try {
      await next();
    } catch (err) {
      if (ctx.get('accept').includes('json')) {
        ctx.status = 200;
        ctx.body = {
          message: err.message
        };
      } else {
        ctx.status = 500;
        ctx.body = err.message;
      }
    }
  } else {
    await next();
  }
};
