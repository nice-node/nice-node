import Koa from 'koa';
import Router from 'koa-router';
// import debug from 'debug-filename';
import watcherMiddleware from 'easy-node/watcher-middleware';
import request from 'easy-node/request';

// 设置监控打点名称
const metric = 'home';

const { TODO_DETAIL_URL, TODO_DETAIL_TIMEOUT } = process.env;

const router = new Router();
router.get('/', watcherMiddleware(metric), async (ctx: Koa.Context) => {
  // debug('==== home ====');
  ctx.logger.debug({ a: 'a', b: 2, c: { d: 'd' } });
  const requestOptions = {
    headers: {
      watcher: {
        metric // <- 这里设置打点名称
      }
    },
    timeout: Number(TODO_DETAIL_TIMEOUT)
  };

  let data: any;
  try {
    const response = await request.get(TODO_DETAIL_URL, requestOptions);
    data = response.data;
  } catch (error) {
    data = {};
    console.log(error);
  }
  ctx.body = data;
});

export default router.routes();
