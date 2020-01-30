import Koa from 'koa';
import Router from 'koa-router';
import debug from 'debug-filename';
import watcher from 'easy-node/dist/middlewares/watcher';
import request from 'easy-node/dist/utils/request';

// 设置监控打点名称
const metric = 'home';

const router = new Router();
router.get('/', watcher(metric), async (ctx: Koa.Context) => {
  debug('==== home ====');
  const requestOptions = {
    headers: {
      watcher: {
        metric: 'home' // <- 这里设置打点名称
      }
    }
  };
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  try {
    const { data } = await request.get(url, requestOptions);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  ctx.body = 'home';
});

export default router.routes();
