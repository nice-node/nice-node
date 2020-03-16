import Koa from 'koa';
import './utils/version';
import './utils/load-env';
import './utils/set-node-path';
import autoRegisterRouter, { AutoRegisterRouterOptions } from './utils/auto-register-router';
import pug, { PugOptions } from './utils/pug';
import staticFileMiddleware, { StaticFileMiddlewareOptions } from './middlewares/static-file';
import checkUrlsMiddleware, { CheckUrlMiddlewareOptions } from './middlewares/check-urls';
import healthCheckMiddleware, { HealthCheckMiddlewareOptions } from './middlewares/health-check';
import bodyParserMiddleware, { BodyParserMiddlewareOptions } from './middlewares/body-parser';
import accessLogMiddleware, { AccessLogMiddlewareOptions } from './middlewares/access-log';
import loggerMiddleware, { LoggerMiddlewareOptions } from './middlewares/logger';
import catchThrowMiddleware, { CatchThrowMiddlewareOptions } from './middlewares/catch-throw';
import httpProxyMiddleware, { HttpProxyMiddlewareOptions } from './middlewares/http-proxy';
import graphqlMiddleware, { GraphqlMiddlewareOptions } from './middlewares/graphql';

interface NiceNodeOptions {
  staticFile?: StaticFileMiddlewareOptions,
  checkUrl?: CheckUrlMiddlewareOptions,
  healthCheck?: HealthCheckMiddlewareOptions,
  bodyParser?: BodyParserMiddlewareOptions,
  accessLog?: AccessLogMiddlewareOptions,
  logger?: LoggerMiddlewareOptions,
  catchThrow?: CatchThrowMiddlewareOptions,
  httpProxy?: HttpProxyMiddlewareOptions,
  pug?: PugOptions,
  autoRegisterRouter?: AutoRegisterRouterOptions,
  graphql?: GraphqlMiddlewareOptions
}

export default class NiceNode {
  public server: Koa;

  private options: NiceNodeOptions;

  constructor(options: NiceNodeOptions = {}) {
    this.options = options;
    this.createServer();
  }

  // 可以重写该方法来满足自定义需求
  createServer(): void {
    const {
      staticFile: staticFileOptions,
      checkUrl: checkUrlOptions,
      healthCheck: healthCheckOptions,
      bodyParser: bodyParserOptions,
      accessLog: accessLogOptions,
      logger: loggerOptions,
      catchThrow: catchThrowOptions,
      httpProxy: httpProxyOptions,
      pug: pugOptions,
      autoRegisterRouter: autoRegisterRouterOptions,
      graphql: graphqlOptions
    } = this.options;

    this.server = new Koa();
    this.server
      .use(staticFileMiddleware(staticFileOptions))
      .use(catchThrowMiddleware(catchThrowOptions))
      .use(accessLogMiddleware(accessLogOptions))
      .use(loggerMiddleware(loggerOptions))
      .use(checkUrlsMiddleware(checkUrlOptions))
      .use(healthCheckMiddleware(healthCheckOptions))
      .use(bodyParserMiddleware(bodyParserOptions))
      .use(graphqlMiddleware(graphqlOptions))
      .use(httpProxyMiddleware(httpProxyOptions));

    pug(this.server, pugOptions);
    autoRegisterRouter(this.server, autoRegisterRouterOptions);
  }
}
