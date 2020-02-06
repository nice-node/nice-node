import { resolve } from 'path';
import Koa from 'koa';
import './utils/load-env';
import './utils/set-node-path';
import bodyParser from 'koa-bodyparser';
import checkUrls from './middlewares/check-urls';
import healthCheck from './middlewares/health-check';
import accessLog from './middlewares/access-log';
import logger from './middlewares/logger';
// import graphql from './middlewares/graphql';

export default class EasyNode {
  server: Koa;

  constructor() {
    this.createServer();
  }

  // 可以重写该方法来满足自定义需求
  createServer(): void {
    const { 
      GRAPHQL_ENABLE,
      PUG_ENABLE,
      PUG_BASEDIR,
      PUG_VIEWPATH
    } = process.env;

    this.server = new Koa();
    this.server
      // 记录访问日志
      .use(accessLog())
      .use(logger)
      .use(checkUrls)
      .use(healthCheck)
      .use(bodyParser());

    if (GRAPHQL_ENABLE === 'true') {
      const graphql = require('./middlewares/graphql');
      this.server.use(graphql());
    }

    console.log(PUG_ENABLE === 'true');

    if (PUG_ENABLE === 'true') {
      const Pug = require('koa-pug');
      const pug = new Pug({
        basedir: resolve(PUG_BASEDIR),
        viewPath: resolve(PUG_VIEWPATH)
      });
      pug.use(this.server);
    }
  }
}
