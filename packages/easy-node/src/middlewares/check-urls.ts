/**
 * 发布过程中的 /check_url
 * /check_url 返回 200 表示服务启动正常
 */

import Koa from 'koa';
import Router from 'koa-router';

const { CHECK_URLS_ENDPOINT } = process.env;

const router = new Router();

// router.get('/', async (ctx: Koa.Context) => {
//   // noah和ops使用 /
//   // 只是标识服务启动正常，不需要判断ready状态
//   ctx.status = 200;
//   ctx.body = 'ok';
// });

router.get(CHECK_URLS_ENDPOINT, async (ctx: Koa.Context) => {
  // portal使用 /check_urls
  // 并且需要等待所有的依赖完成后调用checkurlReady改变状态
  ctx.status = 200;
  ctx.body = 'ok';
});

export default router.routes();
