import request from 'supertest';
import NiceNode from '../../src/server';

describe('middlewares/http-proxy.ts', () => {
  describe('is enable', () => {
    it('should proxy get request', async () => {
      const app = new NiceNode({
        httpProxy: {
          '/todos/:id': {
            target: 'http://jsonplaceholder.typicode.com'
          }
        }
      });
      await request(app.server.listen())
        .get('/todos/1')
        .expect(200);
    });

    it('should proxy post request', async () => {
      const app = new NiceNode({
        httpProxy: {
          '/posts': {
            target: 'http://jsonplaceholder.typicode.com',
            logs: true
          }
        }
      });
      await request(app.server.listen())
        .post('/posts')
        .send({
          title: 'foo',
          body: 'bar',
          userId: 1
        })
        .set('content-type', 'application/x-www-form-urlencoded')
        .expect(200)
        .expect('{"title":"foo","body":"bar","userId":"1","id":101}');
    });

    it('should return 404 when proxy to an error url', async () => {
      const app = new NiceNode({
        httpProxy: {
          '/error': {
            target: 'http://www.error.com'
          }
        }
      });
      await request(app.server.listen())
        .get('/error')
        .expect(404);
    });
  });
});
