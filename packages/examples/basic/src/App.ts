import Koa from 'koa';
import Nice from 'nice/dist/Nice';

export default class App extends Nice {
  createServer(): void {
    this.server = new Koa();
    this.server.use(async (ctx, next) => {
      console.log('=====');
      await next();
    });
  }
}
