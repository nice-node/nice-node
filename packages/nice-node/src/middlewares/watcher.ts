/**
 * 记录接口请求的次数和耗时的中间件
 * @param {string} metric 打点名称
 *
 */

import Koa from 'koa';
import { increment, timing } from '../utils/watcher';

export default (metric: string) => async (ctx: Koa.Context, next: Koa.Next) => {
  const startTime = new Date();
  await next();
  increment(metric);
  timing(metric, startTime);
};
