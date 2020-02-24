/**
 * 捕捉 koa 异常的中间件
 * 根据 header.accept 类型返回适合的数据
 */

import Koa from 'koa';
import staticFile from 'koa-static';
import compose from 'koa-compose';
import deepmerge from 'deepmerge';

export interface StaticMiddlewareOptions {
  enable?: boolean,
  options?: {
    root?: string | string[]
    options?: object
  }
}

export default (opts: StaticMiddlewareOptions = {}) => {
  const {
    STATIC_ENABLE,
    STATIC_ROOR
  } = process.env;

  const defaultOptions = {
    enable: STATIC_ENABLE === 'true',
    options: {
      root: STATIC_ROOR,
      options: {}
    }
  };

  const { enable, options: { root, options } } = deepmerge(defaultOptions, opts);
  if (enable) {
    let roots: string[] = Array.isArray(root) ? root : root.split(',');
    return compose(roots.map((dir) => staticFile(dir, options)));
  }
  
  return async (ctx: Koa.Context, next: Koa.Next) => {
    await next();
  }
};
