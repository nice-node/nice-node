/**
 * 请求代理
 * @param {object} options
 */

import proxy, { IKoaProxiesOptions } from 'koa-proxies';
import Koa from 'koa';
import deepmerge from 'deepmerge';

interface Options extends IKoaProxiesOptions {
  pattern?: string;
}

export interface ProxyMiddlewareOptions {
  enable?: boolean;
  options?: Options;
}

export default (opts: ProxyMiddlewareOptions = {}) => {
  const { PROXY_ENABLE, PROXY_PATTERN, PROXY_TARGET } = process.env;
  const defaultOptions: ProxyMiddlewareOptions = {
    enable: PROXY_ENABLE === 'true',
    options: {
      pattern: PROXY_PATTERN,
      target: PROXY_TARGET,
      changeOrigin: true,
      // rewrite: (path) => path.replace(/^\/octocat(\/|\/\w+)?$/, '/vagusx'),
      logs: true
    }
  };

  const { enable, options: { pattern, ...rest } } = deepmerge(defaultOptions, opts);

  if (enable) {
    return proxy(pattern, rest);
  }

  return async (ctx: Koa.Context, next: Koa.Next) => {
    await next();
  };
};
