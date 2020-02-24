import { resolve } from 'path';
import Koa from 'koa';
import './utils/version';
import './utils/load-env';
import './utils/set-node-path';
import requireAllRoutes, { RequireAllRoutesOptions } from './utils/require-all-routes';
import parsePugTemplate, { PugOptions } from './utils/parse-pug-template';
import staticMiddleware, { StaticMiddlewareOptions } from './middlewares/static';
import checkUrlsMiddleware, { CheckUrlMiddlewareOptions } from './middlewares/check-urls';
import healthCheckMiddleware, { HealthCheckMiddlewareOptions } from './middlewares/health-check';
import bodyParserMiddleware, { BodyParserMiddlewareOptions } from './middlewares/body-parser';
import accessLogMiddleware, { AccessLogMiddlewareOptions } from './middlewares/access-log';
import loggerMiddleware, { LoggerMiddlewareOptions } from './middlewares/logger';
import catchErrorMiddleware, { CatchErrorMiddlewareOptions } from './middlewares/catch-error';
import proxyMiddleware, { ProxyMiddlewareOptions } from './middlewares/proxy';
import graphqlMiddleware, { GraphqlMiddlewareOptions } from './middlewares/graphql';

interface NiceNodeOptions {
  static?: StaticMiddlewareOptions,
  checkUrl?: CheckUrlMiddlewareOptions,
  healthCheck?: HealthCheckMiddlewareOptions,
  bodyParser?: BodyParserMiddlewareOptions,
  accessLog?: AccessLogMiddlewareOptions,
  logger?: LoggerMiddlewareOptions,
  catchError?: CatchErrorMiddlewareOptions,
  proxy?: ProxyMiddlewareOptions,
  pug?: PugOptions,
  router?: RequireAllRoutesOptions,
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
      static: staticOptions,
      checkUrl: checkUrlOptions,
      healthCheck: healthCheckOptions,
      bodyParser: bodyParserOptions,
      accessLog: accessLogOptions,
      logger: loggerOptions,
      catchError: catchErrorOptions,
      proxy: proxyOptions,
      pug: pugOptions,
      router: routerOptions,
      graphql: graphqlOptions
    } = this.options;

    this.server = new Koa();
    this.server
      .use(staticMiddleware(staticOptions))
      .use(catchErrorMiddleware(catchErrorOptions))
      .use(accessLogMiddleware(accessLogOptions))
      .use(loggerMiddleware(loggerOptions))
      .use(checkUrlsMiddleware(checkUrlOptions))
      .use(healthCheckMiddleware(healthCheckOptions))
      .use(bodyParserMiddleware(bodyParserOptions))
      .use(proxyMiddleware(proxyOptions))
      .use(graphqlMiddleware(graphqlOptions));

    parsePugTemplate(this.server, pugOptions);
    requireAllRoutes(this.server, routerOptions);
  }
}
