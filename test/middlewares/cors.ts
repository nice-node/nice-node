import request from 'supertest';
import Koa from 'koa';
import should from 'should';
import NiceNode from '../../src/server';

describe('middlewares/cors.ts', () => {
  describe('is enable', () => {
    it('should get access-control-allow-origin: *', async () => {
      const app = new NiceNode({
        cors: {
          enable: true
        }
      });
      app.server.use(async (ctx: Koa.Context) => {
        ctx.body = 'ok';
      });
      await request(app.server.listen())
        .get('/')
        .expect(200)
        .expect('access-control-allow-origin', '*');
    });
  });

  describe('is disable', () => {
    it('should not get access-control-allow-origin', async () => {
      const app = new NiceNode({
        cors: {
          enable: false
        }
      });
      app.server.use(async (ctx: Koa.Context) => {
        ctx.body = 'ok';
      });
      const res = await request(app.server.listen()).get('/');
      ('access-control-allow-origin' in res.header).should.be.false();
    });
  });
});
