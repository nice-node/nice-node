/**
 * 一个让 webserver 能提供静态文件服务的中间件
 */

import Koa from 'koa';
import staticFile from 'koa-static';
import send from 'koa-send';
import compose from 'koa-compose';
import deepmerge from 'deepmerge';

export interface StaticFileMiddlewareOptions {
  enable?: boolean,
  options?: {
    /** 静态文件根目录 */
    root: string | string[]
    koaStatic?: {
      /** 浏览器缓存文件的毫秒数 */
      maxage?: number;
      /** 允许传输隐藏文件 */
      hidden?: boolean;
      /** 默认文件名称 */
      index?: string;
      /** 是否推迟执行 */
      defer?: boolean;
      /** 是否支持 `gzip` */
      gzip?: boolean;
      /** 是否支持 `brotli` */
      br?: boolean;
      /** 设置请求头 */
      setHeaders?: send.SetHeaders;
      /** 默认后缀名数组 */
      extensions?: string[] | false;
    }
  }
}

export default (opts: StaticFileMiddlewareOptions = {}) => {
  const {
    STATIC_FILE_ENABLE,
    STATIC_FILE_ROOR
  } = process.env;

  const defaultOptions: StaticFileMiddlewareOptions = {
    enable: STATIC_FILE_ENABLE === 'true',
    options: {
      root: STATIC_FILE_ROOR,
      koaStatic: {}
    }
  };

  const { enable, options: { root, koaStatic } } = deepmerge(defaultOptions, opts);
  if (enable) {
    const roots: string[] = Array.isArray(root) ? root : root.split(',');
    return compose(roots.map((dir) => staticFile(dir, koaStatic)));
  }

  return async (ctx: Koa.Context, next: Koa.Next) => {
    await next();
  };
};
