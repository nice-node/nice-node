/**
 * 捕捉 koa 异常的中间件
 * 根据 header.accept 类型返回适合的数据
 */

import Koa from 'koa';

export default async (ctx: Koa.Context, next: Koa.Next) => {
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
};
