import request from 'supertest';
import NiceNode from '../../src/server';

describe('middlewares:static', () => {
  describe('is enable', () => {
    describe('when root is a directory', () => {
      it('should serve static files', async () => {
        const app = new NiceNode({
          staticFile: {
            enable: true,
            options: {
              root: '.'
            }
          }
        });
        await request(app.server.listen())
          .get('/package.json')
          .expect(200);
      });
    });

    describe('when root is multiple directories', () => {
      it('should serve static files', async () => {
        const app = new NiceNode({
          staticFile: {
            enable: true,
            options: {
              root: ['.', 'src']
            }
          }
        });
        await request(app.server.listen())
          .get('/package.json')
          .expect(200);
      });
    });
  });
});
