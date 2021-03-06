import request from 'supertest';
import NiceNode from '../../src/server';

describe('utils/auto-register-router.ts', () => {
  describe('is enable', () => {
    it('should require all routes', async () => {
      const app = new NiceNode({
        autoRegisterRouter: {
          enable: true,
          options: {
            root: 'test/fixtures/routes'
          }
        }
      });
      await request(app.server.listen())
        .get('/a')
        .expect(200);
      await request(app.server.listen())
        .get('/b/c')
        .expect(200);
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
