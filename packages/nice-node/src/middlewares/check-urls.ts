/**
 * 发布过程中的 /check_url
 * /check_url 返回 200 表示服务启动正常
 */

import Koa from 'koa';
import Router from 'koa-router';
import deepmerge from 'deepmerge';

export interface CheckUrlMiddlewareOptions {
  enable?: boolean,
  options?: {
    endpoint?: string
  }
}

export default (opts: CheckUrlMiddlewareOptions = {}) => {
  const { CHECK_URLS_ENABLE, CHECK_URLS_ENDPOINT } = process.env;

  const defaultOptions = {
    enable: CHECK_URLS_ENABLE === 'true',
    options: {
      endpoint: CHECK_URLS_ENDPOINT
    }
  };

  const { enable, options: { endpoint } } = deepmerge(defaultOptions, opts);

  const router = new Router();

  if (enable) {
    router.get(endpoint, async (ctx: Koa.Context) => {
      // portal使用 /check_urls
      // 并且需要等待所有的依赖完成后调用checkurlReady改变状态
      ctx.status = 200;
      ctx.body = 'ok';
    });
  }

  return router.routes();
}
