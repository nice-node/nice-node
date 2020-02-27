import request from 'supertest';
import NiceNode from '../../src/server';

describe('middlewares:proxy', () => {
  describe('is enable', () => {
    it('should proxy url', async () => {
      const app = new NiceNode({
        proxy: {
          enable: true,
          options: {
            pattern: '/todos/1',
            target: 'https://jsonplaceholder.typicode.com',
            logs: false
          }
        }
      });
      await request(app.server.listen())
        .get('/todos/1')
        .expect(200);
    });
  });
});
