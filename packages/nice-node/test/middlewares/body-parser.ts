import request from 'supertest';
import Koa from 'koa';
import NiceNode from '../../src/server';

describe('middlewares:body-parser', () => {
  describe('is enable', () => {
    it('should get post data', async () => {
      const app = new NiceNode();
      app.server.use(async (ctx: Koa.Context) => {
        ctx.body = ctx.request.body?.key;
      });
      await request(app.server.listen())
        .post('/')
        .send({ key: 'value' })
        .expect(200)
        .expect('value');
    });
  });

  describe('is disable', () => {
    it('should not get post data', async () => {
      const app = new NiceNode({
        bodyParser: {
          enable: false
        }
      });
      app.server.use(async (ctx: Koa.Context) => {
        ctx.body = ctx.request.body?.key;
      });
      await request(app.server.listen())
        .post('/')
        .send({ key: 'value' })
        .expect(204)
        .expect('');
    });
  });
});
