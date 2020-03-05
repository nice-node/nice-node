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
import { Middleware } from 'koa';
import Router from 'koa-router';
import deepmerge from 'deepmerge';
import isNodeRuntime from '../utils/is-node-runtime';

export interface GraphqlMiddlewareOptions {
  /** 是否启用中间件 */
  enable?: boolean,
  options?: {
    /** Graphql 地址 */
    endpoint?: string,
    /** Scheme 文件匹配格式 */
    typedefsPattern?: string,
    /** Resolver 文件匹配格式 */
    resolversPattern?: string,
    koaGraphql?: {
      /**
       * 传递到本中间件上下文的值
       */
      context?: any;

      /**
       * 是否美化输出 `JSON`
       */
      pretty?: boolean;

      /**
       * 错误信息格式化函数
       */
      formatError?: (error: any, context?: any) => any;

      /**
       * 额外增加的请求验证规则
       */
      validationRules?: Array<(arg0: any) => any>;

      /**
       * 在返回结果中增加 `extensions` 字段的函数
       */
      extensions?: (info: any) => { [key: string]: any };

      /**
       * 是否使用 `GraphiQL`
       */
      graphiql?: boolean;

      /**
       * A resolver function to use when one is not provided by the schema.
       * If not provided, the default field resolver is used (which looks for a
       * value or method on the source value with the field's name).
       */
      fieldResolver?: any;
    }
  }
}

export default (opts: GraphqlMiddlewareOptions = {}): Middleware => {
  const {
    GRAPHQL_ENABLE,
    GRAPHQL_ENDPOINT,
    GRAPHQL_TYPEDEFS_PATTERN,
    GRAPHQL_RESOLVERS_PATTERN,
    PROFILE,
    DIST
  } = process.env;

  const defaultOptions = {
    enable: GRAPHQL_ENABLE === 'true',
    options: {
      endpoint: GRAPHQL_ENDPOINT,
      typedefsPattern: GRAPHQL_TYPEDEFS_PATTERN,
      resolversPattern: GRAPHQL_RESOLVERS_PATTERN,
      koaGraphql: {}
    }
  };

  const {
    enable,
    options: {
      endpoint,
      typedefsPattern,
      resolversPattern,
      koaGraphql
    }
  } = deepmerge(defaultOptions, opts);

  const router = new Router();
  if (enable) {
    // eslint-disable-next-line global-require,import/no-unresolved
    const graphqlHTTP = require('koa-graphql-fix');
    // eslint-disable-next-line global-require,import/no-unresolved
    const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
    // eslint-disable-next-line global-require,import/no-unresolved
    const { makeExecutableSchema } = require('graphql-tools');
    // eslint-disable-next-line global-require,import/no-unresolved
    const { GraphQLJSON } = require('graphql-type-json');

    /* istanbul ignore next */
    const ext = isNodeRuntime ? 'js' : 'ts';
    /* istanbul ignore next */
    const src = isNodeRuntime ? DIST : 'src';
    const cwd = process.cwd();
    const typeDefsPattern = typedefsPattern.replace('{src}', src);

    const replacedResolversPattern = resolversPattern
      .replace('{src}', src)
      .replace('{ext}', ext);
    const typesArray = fileLoader(join(cwd, typeDefsPattern));
    const typeDefs = mergeTypes(typesArray, { all: true });
    const resolversArray = fileLoader(join(cwd, replacedResolversPattern));
    const resolvers = {
      JSON: GraphQLJSON,
      ...mergeResolvers(resolversArray)
    };
    const executableSchema = makeExecutableSchema({ typeDefs, resolvers });

    router.all(endpoint, graphqlHTTP({
      graphiql: PROFILE !== 'prod',
      ...koaGraphql,
      schema: executableSchema,
      rootValue: { ...resolvers.Query, ...resolvers.Mutation }
    }));
  }
  return router.routes();
};
