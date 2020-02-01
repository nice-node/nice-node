/**
 * 为 koa 自动增加 GraphQL 的中间件
 * 该中间件注册后，会自动增加一个 /:endpoint 的路由
 *
 * @param {GraphQLSchema} schema - schema
 * @param {object} [rootValue] - graphql resolve
 * @param {string} [endpoint=/graphql] - 服务根路径
 * @param {boolean} [graphiql] - 是否使用 graphiql 工具
 * @param {string} [context]
 * @param {boolean} [pretty]
 * @param {function} [formatError]
 *
 * @see
 * https://github.com/chentsulin/koa-graphql
 */

import Router from 'koa-router';
import graphqlHTTP from 'koa-graphql-fix';

const isProd = process.env.NODE_ENV === 'prod';

export default (options: any) => {
  // 设置中间件默认参数
  let defaultOptions: any = {
    endpoint: '/graphql'
  };

  defaultOptions = {
    graphiql: !isProd, // 线上环境关闭graphiql
    pretty: true,
    ...defaultOptions
  };
  options = { ...defaultOptions, ...options };

  const router = new Router();
  router.all(options.endpoint, (ctx, next) => {
    return graphqlHTTP(options)(ctx, next);
  });
  return router.routes();
};
