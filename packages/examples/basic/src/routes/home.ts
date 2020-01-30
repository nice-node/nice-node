import Koa from 'koa';
import Router from 'koa-router';
import debug from 'debug-filename';
import watcher from 'easy-node/dist/middlewares/watcher';
import request from 'easy-node/dist/utils/request';
import logger from 'easy-node/dist/utils/logger';

// 设置监控打点名称
const metric = 'home';

const router = new Router();
router.get('/', watcher(metric), async (ctx: Koa.Context) => {
  debug('==== home ====');
  logger.info('aa');
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  const requestOptions = {
    headers: {
      watcher: {
        metric // <- 这里设置打点名称
      }
    }
  };

  let data: any;
  try {
    const response = await request.get(url, requestOptions);
    data = response.data;
  } catch (error) {
    data = {};
    console.log(error);
  }
  ctx.body = data;
});

export default router.routes();
