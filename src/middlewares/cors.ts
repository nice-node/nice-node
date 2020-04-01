import cors from 'koa2-cors';
import deepmerge from 'deepmerge';
import Koa from 'koa';

export interface CorsMiddlewareOptions {
  enable?: boolean,
  options?: cors.Options
}

export default (opts: CorsMiddlewareOptions = {}): Koa.Middleware => {
  const { CORS_ENABLE } = process.env;

  const defaultOptions = {
    enable: CORS_ENABLE === 'true',
    options: {}
  };

  const { enable, options } = deepmerge(defaultOptions, opts);
  if (enable) {
    return cors(options);
  }

  return async (ctx: Koa.Context, next: Koa.Next) => {
    await next();
  };
};
