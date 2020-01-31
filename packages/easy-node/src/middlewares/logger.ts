/**
 * 在 ctx 的中间件
 * @param {string} metric 打点名称
 */

import Koa from 'koa';
import logger from '../utils/logger';

export default async (ctx: Koa.Context, next: Koa.Next) => {
  ctx.logger = logger;
  await next();
};
