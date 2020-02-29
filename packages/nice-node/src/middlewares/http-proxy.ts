import Koa from 'koa';
import Router from 'koa-router';
import axios, { AxiosResponse, AxiosRequestConfig, Method } from 'axios';
import qs from 'qs';

export interface HttpProxyMiddlewareOptions {
  [key: string]: {
    target: string;
    logs?: boolean;
  }
}

function logger(ctx: Koa.Context, target: string) {
  console.log('%s - %s %s proxy to -> %s', new Date().toISOString(), ctx.method, ctx.url, new URL(ctx.url, target));
}

export default (opts: HttpProxyMiddlewareOptions = {}) => {
  const router = new Router();
  Object.keys(opts).forEach((key: string) => {
    const { target, logs } = opts[key];
    router.all(key, async (ctx: Koa.Context) => {
      const url = target + ctx.url;
      const safeHeaders = { ...ctx.headers };
      delete safeHeaders.host; // 透传 host 会导致某些请求失败

      let data = ctx.request.body;

      if (ctx.get('content-type') === 'application/x-www-form-urlencoded') {
        data = qs.stringify(data);
      }
      const options: AxiosRequestConfig = {
        url,
        method: <Method>ctx.method,
        headers: safeHeaders,
        data
      };

      let res: AxiosResponse;
      try {
        res = await axios(options);
        if (logs) {
          logger(ctx, target);
        }
        /* istanbul ignore next */
        ctx.body = res?.data;
      } catch (error) {
        ctx.logger.error(error);
      }
    });
  });

  return router.routes();
};
