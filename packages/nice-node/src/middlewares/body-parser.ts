import bodyParser from 'koa-bodyparser';
import deepmerge from 'deepmerge';
import Koa from 'koa';

export interface BodyParserMiddlewareOptions {
  enable?: boolean,
  options?: bodyParser.Options
}

export default (opts: BodyParserMiddlewareOptions = {}) => {
  const { BODY_PARSER_ENABLE } = process.env;

  const defaultOptions = {
    enable: BODY_PARSER_ENABLE === 'true',
    options: {}
  };

  const { enable, options } = deepmerge(defaultOptions, opts);
  if (enable) {
    return bodyParser(options);
  }

  return async (ctx: Koa.Context, next: Koa.Next) => {
    await next();
  };
};
