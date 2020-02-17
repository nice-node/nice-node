import Koa from 'koa';
import Router from 'koa-router';

const router = new Router();
router.get('/basic', async (ctx: Koa.Context) => {
  ctx.body = 'basic';
});

export default router.routes();
