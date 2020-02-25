// import should from 'should';
import request from 'supertest';
import Koa from 'koa';
import NiceNode from '../../src/server';

describe('middlewares:catch-throw', () => {
  describe('is enable', () => {
    describe('when acceptType is text/html', () => {
      const message = 'TestError';
      const app = new NiceNode();
      app.server.use(async (ctx: Koa.Context) => {
        ctx.throw(400, new Error(message));
      });

      it('should return 500 when acceptType is text/html', async () => {
        await request(app.server.listen())
          .get('/')
          .expect(500)
          .expect(message);
      });

      it('should return 200 when acceptType is application/json', async () => {
        const { body } = await request(app.server.listen())
          .get('/')
          .accept('application/json')
          .expect(200);
        body.should.have.property('message', message);
      });
    });
  });

  describe('is disable', () => {
    it('should return 400', async () => {
      const message = 'TestError';
      const app = new NiceNode({
        catchThrow: {
          enable: false
        }
      });
      app.server.use(async (ctx: Koa.Context) => {
        ctx.throw(400, new Error(message));
      });
      await request(app.server.listen())
        .get('/')
        .expect(400);
    });
  });
});
