import Koa from 'koa';
import Router from 'koa-router';

const router = new Router();
router.get('/a', async (ctx: Koa.Context) => {
  ctx.body = 'a';
});

export default router.routes();
