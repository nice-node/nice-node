import Koa from 'koa';
import Router from 'koa-router';
// import watcherMiddleware from 'nice-node/watcher-middleware';
import request from 'nice-node/request';

export default (router: Router) => {
  // 设置监控打点名称
  const metric = 'home';
  const { TODO_DETAIL_URL, TODO_DETAIL_TIMEOUT } = process.env;

  router.get('/', async (ctx: Koa.Context) => {
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
};
