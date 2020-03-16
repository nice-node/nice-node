import Koa from 'koa';
import Router from 'koa-router';

const router = new Router();
router.get('/b/c', async (ctx: Koa.Context) => {
  ctx.body = 'b/c';
});

export default router.routes();
