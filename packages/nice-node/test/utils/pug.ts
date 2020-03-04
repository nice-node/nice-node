import request from 'supertest';
import Koa from 'koa';
import NiceNode from '../../src/server';

describe('utils/pug.ts', () => {
  describe('is enable', () => {
    it('should parse pug template', async () => {
      const app = new NiceNode({
        pug: {
          enable: true,
          options: {
            viewPath: 'test/fixtures/templates'
          }
        }
      });
      app.server.use(async (ctx: Koa.Context) => {
        ctx.status = 200;
        await ctx.render('default.pug');
      });

      await request(app.server.listen())
        .get('/')
        .expect(200)
        .expect('<h1>Hello world</h1>');
    });
  });

  describe('is disable', () => {
    it('should not require any route', async () => {
      const app = new NiceNode({
        autoRegisterRouter: {
          enable: false,
          options: {
            root: 'test/fixtures/routes'
          }
        }
      });
      await request(app.server.listen())
        .get('/a')
        .expect(404);
      await request(app.server.listen())
        .get('/b/c')
        .expect(404);
    });
  });
});
