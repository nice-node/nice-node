/**
 * 提供给 openstream 用的地址，用来决定机器是否上线
 * /healthcheck 返回 200 表示机器正常，可以对外提供服务
 */

import { existsSync } from 'fs';
import { resolve } from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import deepmerge from 'deepmerge';

export interface HealthCheckMiddlewareOptions {
  enable?: boolean,
  options?: {
    endpoint?: string
  }
}

export default (opts: HealthCheckMiddlewareOptions = {}) => {
  const { HEALTH_CHECK_ENABLE, HEALTH_CHECK_ENDPOINT } = process.env;

  const defaultOptions = {
    enable: HEALTH_CHECK_ENABLE === 'true',
    options: {
      endpoint: HEALTH_CHECK_ENDPOINT
    }
  };

  const { enable, options: { endpoint } } = deepmerge(defaultOptions, opts);

  const router = new Router();

  if (enable) {
    router.get(endpoint, async (ctx: Koa.Context) => {
      const file = resolve(endpoint.substr(1, endpoint.length));
      ctx.status = existsSync(file) ? 200 : 404;
    });
  }

  return router.routes();
};
