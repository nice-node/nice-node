import request from 'supertest';
import Koa from 'koa';
import Router from 'koa-router';
import NiceNode from '../../src/server';

describe('middlewares/logger.ts', () => {
  describe('is enable', () => {
    it('should find ctx.logger', async () => {
      const app = new NiceNode();
      app.server.use(async (ctx: Koa.Context) => {
        ctx.status = 'logger' in ctx ? 200 : 500;
      });
      await request(app.server.listen())
        .get('/')
        .expect(200);
    });

    it('should works well with koa-router', async () => {
      const app = new NiceNode();
      const router = new Router();
      router.all('/', async (ctx: Koa.Context) => {
        ctx.status = 'logger' in ctx ? 200 : 500;
      });
      app.server.use(router.routes());
      await request(app.server.listen())
        .get('/')
        .expect(200);
    });
  });

  describe('is disable', () => {
    it('should not find ctx.logger', async () => {
      const app = new NiceNode({
        logger: {
          enable: false
        }
      });
      app.server.use(async (ctx: Koa.Context) => {
        ctx.status = 'logger' in ctx ? 200 : 500;
        ctx.body = 'logger' in ctx;
      });
      await request(app.server.listen())
        .get('/')
        .expect(500);
    });
  });
});
