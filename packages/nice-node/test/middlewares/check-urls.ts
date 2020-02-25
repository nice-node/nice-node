// import should from 'should';
import request from 'supertest';
import NiceNode from '../../src/server';

describe('middlewares:check-urls', () => {
  describe('is enable', () => {
    it('should return 200', async () => {
      const { CHECK_URLS_ENDPOINT } = process.env;
      const app = new NiceNode();
      await request(app.server.listen())
        .get(CHECK_URLS_ENDPOINT)
        .expect(200)
        .expect('ok');
    });
  });

  describe('is disable', () => {
    it('should return 404', async () => {
      const { CHECK_URLS_ENDPOINT } = process.env;
      const app = new NiceNode({
        checkUrl: {
          enable: false
        }
      });
      await request(app.server.listen())
        .get(CHECK_URLS_ENDPOINT)
        .expect(404);
    });
  });

  describe('when endpoint is set', () => {
    it('should use custom endpoint', async () => {
      const { CHECK_URLS_ENDPOINT } = process.env;
      const endpoint = '/checkurls';
      const app = new NiceNode({
        checkUrl: {
          enable: true,
          options: {
            endpoint
          }
        }
      });
      await request(app.server.listen())
        .get(CHECK_URLS_ENDPOINT)
        .expect(404);

      await request(app.server.listen())
        .get(endpoint)
        .expect(200);
    });
  });
});
