import Koa from 'koa';

export default {
  Query: {
    async todoDetail(root, { id }, ctx: Koa.Context) {
      ctx.logger.info('== test ctx.logger ==', root);
      return {
        id,
        name: 'Joe'
      };
    }
  },
  Mutation: {
  }
};
