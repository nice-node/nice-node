import Koa from 'koa';
import './utils/set-node-path';
import './utils/load-env';
import bodyParser from 'koa-bodyparser';
import checkUrls from './middlewares/check-urls';
import healthCheck from './middlewares/health-check';
import accessLog from './middlewares/access-log';
import logger from './middlewares/logger';

export default class EasyNode {
  server: Koa;

  constructor() {
    this.createServer();
  }

  // 可以重写该方法来满足自定义需求
  createServer(): void {
    const { LOG_ROOT } = process.env;

    this.server = new Koa();

    this.server
      // 记录访问日志
      // TODO 封装
      .use(accessLog())
      .use(logger)
      .use(checkUrls)
      .use(healthCheck)
      .use(bodyParser());
  }
}