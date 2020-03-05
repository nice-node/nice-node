import Koa from 'koa';
import Router from 'koa-router';
import axios, { AxiosResponse, AxiosRequestConfig, Method } from 'axios';
import qs from 'qs';

export interface HttpProxyMiddlewareOptions {
  [key: string]: {
    /** 代理的目标服务器域名 */
    target: string;
    /** 是否输出日志 */
    logs?: boolean;
    /** 重写地址的函数 */
    rewrite?: (/** 当前请求的地址 */path: string) => string;
  }
}

function logger(ctx: Koa.Context, target: string) {
  console.log('%s - %s %s proxy to -> %s', new Date().toISOString(), ctx.method, ctx.url, new URL(ctx.url, target));
}

export default (opts: HttpProxyMiddlewareOptions = {}) => {
  const router = new Router();
  Object.keys(opts).forEach((key: string) => {
    const { target, logs, rewrite } = opts[key];
    router.all(key, async (ctx: Koa.Context) => {
      const url = target + (rewrite ? rewrite(ctx.url) : ctx.url);
      const safeHeaders = { ...ctx.headers };
      delete safeHeaders.host; // 透传 host 会导致某些请求失败

      let data = ctx.request.body;

      /**
       * axios.post 要求发送的 data 参数是用 & 连接的字符串
       * 很多开发者会习惯性的写成 json 对象形式的参数
       * 虽然 node webserver 的 body-parser 中间件会兼容处理 string 和 json 类型参数
       * 但还是在这里统一对 data 参数做兼容性处理
       */
      if (ctx.method === 'POST') {
        data = qs.stringify(data); // 如 a=a&b=b
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

        ctx.body = res.data;
      } catch (error) {
        const {
          request,
          response,
          message,
          config
        } = error;

        if (response) {
          // 请求正常发出去且收到了服务器返回，但状态码不是 2xx
          // 把错误信息透传给调用方
          const { status, statusText } = response;
          ctx.status = status;
          ctx.body = statusText;
          ctx.logger.error(response);
        } /* istanbul ignore next */ else if (request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          ctx.status = 500;
          ctx.body = request;
          ctx.logger.error(request);
        } /* istanbul ignore next */ else {
          // Something happened in setting up the request that triggered an Error
          ctx.status = 500;
          ctx.body = message;
          ctx.logger.error(message);
        }

        /* istanbul ignore next */
        ctx.logger.error(config);
      }
    });
  });

  return router.routes();
};
