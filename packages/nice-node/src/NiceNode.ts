import { resolve } from 'path';
import Koa from 'koa';
import './utils/load-env';
import './utils/set-node-path';
import bodyParser from 'koa-bodyparser';
import checkUrls from './middlewares/check-urls';
import healthCheck from './middlewares/health-check';
import accessLog from './middlewares/access-log';
import logger from './middlewares/logger';
import requireAllRoutes from './utils/require-all-routes';

interface EasyNodeOptions {
  static?: any,
  bodyParser?: any
}

export default class EasyNode {
  server: Koa;

  options: EasyNodeOptions;

  constructor(options: EasyNodeOptions = {}) {
    this.options = {
      static: {},
      bodyParser: {},
      ...options
    };

    this.createServer();
  }

  // 可以重写该方法来满足自定义需求
  createServer(): void {
    const {
      STATIC_ENABLE,
      STATIC_ROOR,
      GRAPHQL_ENABLE,
      PUG_ENABLE,
      PUG_BASEDIR,
      PUG_VIEWPATH,
      REQUIRE_ALL_ROUTES_ENABLE
    } = process.env;

    this.server = new Koa();

    if (STATIC_ENABLE === 'true') {
      // eslint-disable-next-line global-require,import/no-unresolved
      this.server.use(require('koa-static')(STATIC_ROOR, this.options.static));
    }

    this.server
      // 记录访问日志
      .use(accessLog())
      .use(logger)
      .use(checkUrls)
      .use(healthCheck)
      .use(bodyParser(this.options.bodyParser));

    if (GRAPHQL_ENABLE === 'true') {
      // eslint-disable-next-line global-require
      const graphql = require('./middlewares/graphql');
      this.server.use(graphql());
    }

    if (PUG_ENABLE === 'true') {
      // eslint-disable-next-line global-require,import/no-unresolved
      const Pug = require('koa-pug');
      const pug = new Pug({
        basedir: resolve(PUG_BASEDIR),
        viewPath: resolve(PUG_VIEWPATH)
      });
      pug.use(this.server);
    }

    if (REQUIRE_ALL_ROUTES_ENABLE === 'true') {
      requireAllRoutes(this.server);
    }
  }
}
