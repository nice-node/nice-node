/**
 * 为 koa 自动增加 GraphQL 的中间件
 * 该中间件注册后，会自动增加一个 /:endpoint 的路由
 *
 * @param {GraphQLSchema} schema - schema
 * @param {object} [rootValue] - graphql resolve
 * @param {boolean} [graphiql] - 是否使用 graphiql 工具
 * @param {string} [context]
 * @param {boolean} [pretty]
 * @param {function} [formatError]
 *
 * @see
 * https://github.com/chentsulin/koa-graphql
 */

import { join } from 'path';
import Router from 'koa-router';
import graphqlHTTP from 'koa-graphql-fix';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLJSON } from 'graphql-type-json';
import isNodeRuntime from '../utils/is-node-runtime';

const { 
  GRAPHQL_ENDPOINT,
  GRAPHQL_TYPEDEFS_PATTERN,
  GRAPHQL_RESOLVERS_PATTERN,
  NODE_ENV,
  DIST
} = process.env;
const isDebug = NODE_ENV !== 'prod';

export default (options: any = {}) => {
  const ext = isNodeRuntime ? 'js' : 'ts';
  const src = isNodeRuntime ? DIST : 'src';
  const cwd = process.cwd();
  const typeDefsPattern = GRAPHQL_TYPEDEFS_PATTERN.replace('${src}', src);
  const resolversPattern = GRAPHQL_RESOLVERS_PATTERN
    .replace('${src}', src)
    .replace('${ext}', ext);
  const typesArray = fileLoader(join(cwd, typeDefsPattern));
  const typeDefs = mergeTypes(typesArray, { all: true });
  const resolversArray = fileLoader(join(cwd, resolversPattern));
  const resolvers = {
    JSON: GraphQLJSON,
    ...mergeResolvers(resolversArray)
  };
  const executableSchema = makeExecutableSchema({ typeDefs, resolvers });  

  const router = new Router();
  router.all(GRAPHQL_ENDPOINT, graphqlHTTP({
    schema: executableSchema,
    rootValue: { ...resolvers.Query, ...resolvers.Mutation },
    graphiql: isDebug,
    ...options
  }));

  return router.routes();
};
