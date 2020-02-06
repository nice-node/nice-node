import Koa from 'koa';
import Router from 'koa-router';
import watcherMiddleware from 'nice-node/watcher-middleware';
import request from 'nice-node/request';

// 设置监控打点名称
const metric = 'detail';

const { TODO_URL, TODO_TIMEOUT } = process.env;

const router = new Router();
router.get('/todos/:id', watcherMiddleware(metric), async (ctx: Koa.Context) => {
  const requestOptions = {
    headers: {
      watcher: {
        metric // <- 这里设置打点名称
      }
    },
    timeout: Number(TODO_TIMEOUT)
  };

  const { id } = ctx.params;

  let todo: any;
  try {
    const response = await request.get(`${TODO_URL}/${id}`, requestOptions);
    todo = response.data;
  } catch (error) {
    todo = {};
    console.log(error);
  }
  // console.log(todos);
  await ctx.render('detail', { todo });
});

export default router.routes();
