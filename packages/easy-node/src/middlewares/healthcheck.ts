/**
 * 提供给 openstream 用的地址，用来决定机器是否上线
 * /healthcheck 返回 200 表示机器正常，可以对外提供服务
 */

import { existsSync } from 'fs';
import { resolve } from 'path';
import Koa from 'koa';
import Router from 'koa-router';

const router = new Router();

router.get('/healthcheck.html', async (ctx: Koa.Context) => {
  const { HEALTHCHECK_ENABLE, HEALTHCHECK_PATH } = process.env;
  if (HEALTHCHECK_ENABLE === 'true') {
    const html = resolve(HEALTHCHECK_PATH);
    const status = existsSync(html) ? 200 : 404;
    ctx.status = status;
  }
});

export default router.routes();
