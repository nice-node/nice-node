import Koa from 'koa';
import { increment, timing } from '../utils/watcher';

export default (metric: string) => async (ctx: Koa.Context, next: Koa.Next) => {
  const startTime = new Date();
  await next();
  increment(metric);
  timing(metric, startTime);
}

