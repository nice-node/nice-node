/**
 * 提供给 openstream 用的地址，用来决定机器是否上线
 * /healthcheck 返回 200 表示机器正常，可以对外提供服务
 */

import { existsSync } from 'fs';
import { resolve } from 'path';
import Koa from 'koa';
import Router from 'koa-router';

const router = new Router();

const { HEALTH_CHECK_ENDPOINT } = process.env;
router.get(HEALTH_CHECK_ENDPOINT, async (ctx: Koa.Context) => {
  const file = resolve(HEALTH_CHECK_ENDPOINT.substr(1, HEALTH_CHECK_ENDPOINT.length));
  ctx.status = existsSync(file) ? 200 : 404;;
});

export default router.routes();
