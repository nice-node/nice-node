import { Server } from 'http';
import request from 'supertest';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import NiceNode from '../../src/server';
import { startServer, sleep } from '../util';

describe('middlewares/http-proxy.ts', () => {
  let app: NiceNode;
  let targetServer: Server;
  const targetPort: number = 1234;

  before(() => {
    app = new NiceNode({
      httpProxy: {
        '/:status': {
          target: `http://localhost:${targetPort}`
        },
        '/api/:action': {
          target: `http://localhost:${targetPort}`,
          rewrite: (path) => path.replace('/api', '')
        }
      }
    });

    // eslint-disable-next-line max-len
    targetServer = startServer(targetPort, bodyParser(), async (ctx: Koa.Context, next: Koa.Next) => {
      switch (ctx.path) {
        case '/200':
          ctx.body = { data: 'foo' };
          break;
        case '/204':
          ctx.set('x-special-header', 'you see');
          ctx.body = null;
          break;
        case '/500':
          ctx.status = 500;
          break;
        case '/timeout':
          await sleep(2000);
          ctx.body = { data: 'timeout' };
          break;
        case '/post':
          ctx.body = ctx.request.body;
          break;
        case '/rewrite':
          ctx.body = 'rewrite';
          break;
        default:
          return next();
      }
      return null;
    });
  });

  after(() => {
    targetServer && targetServer.close();
  });

  describe('is enable', () => {
    it('should proxy get request', async () => {
      await request(app.server.listen())
        .get('/200')
        .expect(200);
    });

    it('should proxy post request', async () => {
      const data = { title: 'foo' };
      await request(app.server.listen())
        .post('/post')
        .send(data)
        // .send('title=foo')
        .set('content-type', 'application/x-www-form-urlencoded')
        .expect(200)
        .expect(JSON.stringify(data));
    });

    it('should rewrite proxy url', async () => {
      await request(app.server.listen())
        .get('/api/rewrite')
        .expect(200)
        .expect('rewrite');
    });

    it('should return 500 when target url not exists', async () => {
      await request(app.server.listen())
        .get('/abc')
        .expect(500);
    });

    it('should write proxy log', async () => {
      const noLogApp = new NiceNode({
        httpProxy: {
          '/:status': {
            target: `http://localhost:${targetPort}`,
            logs: true
          }
        }
      });
      await request(noLogApp.server.listen())
        .get('/200')
        .expect(200);
    });

    it('should return 500 when target server is unknown', async () => {
      const unknownApp = new NiceNode({
        httpProxy: {
          '/:status': {
            target: 'http://www.3iduwddxx.com'
          }
        }
      });

      await request(unknownApp.server.listen())
        .get('/unknown')
        .expect(500);
    });
  });
});
