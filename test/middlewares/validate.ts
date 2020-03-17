import request from 'supertest';
import Koa from 'koa';
import Router from 'koa-router';
import Joi from 'joi';
import NiceNode from '../../src/server';
import { mwValidate } from '../../src';

describe('middlewares/validate.ts', () => {
  describe('when acceptType is text/html', () => {
    const app = new NiceNode();
    const router = new Router();
    router.get('/', mwValidate({
      query: {
        name: Joi.string().required()
      }
    }), async (ctx: Koa.Context) => {
      ctx.status = 200;
    });
    app.server.use(router.routes());

    it('should return 500 when not query.name', async () => {
      await request(app.server.listen())
        .get('/')
        .expect(500);
    });

    it('should return 200 when has query.name', async () => {
      await request(app.server.listen())
        .get('/?name=a')
        .expect(200);
    });
  });
});
