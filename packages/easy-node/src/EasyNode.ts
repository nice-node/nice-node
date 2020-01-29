import path from 'path';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import setNodePath from './utils/set-node-path';
import loadEnv from './utils/load-env';
import checkurls from './middlewares/checkurls';
import healthcheck from './middlewares/healthcheck';
import accessLog from './middlewares/access-log';

export default class EasyNode {
  server: Koa;

  constructor() {
    setNodePath('dist');
    loadEnv();

    this.createServer();
  }

  // 可以重写该方法来满足自定义需求
  createServer(): void {
    const { LOG_ROOT } = process.env;

    this.server = new Koa();

    this.server
      // 记录访问日志
      // TODO 封装
      .use(accessLog({
        format: ':remote-addr - [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":referrer" ":user-agent"',
        root: path.resolve(LOG_ROOT),
        dateFormat: 'YYYY-MM-DD-HH',
        skip: (req) => [
          '/healthcheck',
          '/favicon.ico'
        ].includes(req.baseUrl)
      }))
      .use(checkurls)
      .use(healthcheck)
      .use(bodyParser());
  }
}
