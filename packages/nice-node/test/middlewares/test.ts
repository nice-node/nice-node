import NiceNode from '../../src/server';

const app = new NiceNode({
  graphql: {
    enable: true,
    options: {
      typedefsPattern: '{src}/../test/fixtures/graphql/**/*.graphql',
      resolversPattern: '{src}/../test/fixtures/graphql/**/resolver.ts'
    }
  }
});
app.server.listen(3000);
