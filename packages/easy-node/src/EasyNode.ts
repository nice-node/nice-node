import { join } from 'path';
import Koa from 'koa';
import './utils/load-env';
import './utils/set-node-path';
import bodyParser from 'koa-bodyparser';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { makeExecutableSchema } from 'graphql-tools';
// import { GraphQLJSON } from 'graphql-type-json';
import isNodeRuntime from './utils/is-node-runtime';
import checkUrls from './middlewares/check-urls';
import healthCheck from './middlewares/health-check';
import accessLog from './middlewares/access-log';
import logger from './middlewares/logger';
import graphql from './middlewares/graphql';

const resolverExtension = isNodeRuntime ? '.js' : '.ts';
const src = isNodeRuntime ? 'dist' : 'src';
const cwd = process.cwd();
const typesArray = fileLoader(join(cwd, `${src}/graphql/**/*.graphql`));
const typeDefs = mergeTypes(typesArray, { all: true });
const resolversArray = fileLoader(join(cwd, `${src}/graphql/**/resolver${resolverExtension}`));
const resolvers = {
  // JSON: GraphQLJSON,
  ...mergeResolvers(resolversArray)
};
const executableSchema = makeExecutableSchema({ typeDefs, resolvers });

export default class EasyNode {
  server: Koa;

  constructor() {
    this.createServer();
  }

  // 可以重写该方法来满足自定义需求
  createServer(): void {
    this.server = new Koa();
    this.server
      // 记录访问日志
      .use(accessLog())
      .use(logger)
      .use(checkUrls)
      .use(healthCheck)
      .use(bodyParser())
      .use(graphql({
        schema: executableSchema,
        rootValue: { ...resolvers.Query, ...resolvers.Mutation }
      }));
  }
}
