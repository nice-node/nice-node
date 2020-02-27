import request from 'supertest';
import NiceNode from '../../src/server';

describe('middlewares:graphql', () => {
  describe('is enable', () => {
    describe('when root is a directory', () => {
      it('should serve static files', async () => {
        const app = new NiceNode({
          graphql: {
            enable: true,
            options: {
              typedefsPattern: '{src}/../test/fixtures/graphql/**/*.graphql',
              resolversPattern: '{src}/../test/fixtures/graphql/**/resolver.ts'
            }
          }
        });
        const { GRAPHQL_ENDPOINT } = process.env;
        const res = await request(app.server.listen())
          .get(`${GRAPHQL_ENDPOINT}?query={test{name}}`)
          .expect(200);
        res.body.data.test.name.should.equal('test');
      });
    });
  });
});
