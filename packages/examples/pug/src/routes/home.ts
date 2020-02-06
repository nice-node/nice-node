import Koa from 'koa';
import Router from 'koa-router';
import watcherMiddleware from 'nice-node/watcher-middleware';
import request from 'nice-node/request';

// 设置监控打点名称
const metric = 'home';

const { TODO_URL, TODO_TIMEOUT } = process.env;

const router = new Router();
router.get('/', watcherMiddleware(metric), async (ctx: Koa.Context) => {
  // ctx.logger.debug({ a: 'a', b: 2, c: { d: 'd' } });
  const requestOptions = {
    headers: {
      watcher: {
        metric // <- 这里设置打点名称
      }
    },
    timeout: Number(TODO_TIMEOUT)
  };

  let todos: any;
  try {
    const response = await request.get(TODO_URL, requestOptions);
    todos = response.data;
  } catch (error) {
    todos = [];
    console.log(error);
  }
  // console.log(todos);
  await ctx.render('home', { todos });
});

export default router.routes();
