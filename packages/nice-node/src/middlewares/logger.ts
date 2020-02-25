/**
 * 在 ctx 的中间件
 * @param {string} metric 打点名称
 */

import Koa from 'koa';
import logger from '../utils/logger';

export interface LoggerMiddlewareOptions {
  enable?: boolean
}

export default (opts: LoggerMiddlewareOptions = {}) => async (ctx: Koa.Context, next: Koa.Next) => {
  const { LOGGER_ENABLE } = process.env;
  const { enable } = {
    enable: LOGGER_ENABLE,
    ...opts
  };
  if (enable) {
    ctx.logger = logger;
  }
  await next();
};
