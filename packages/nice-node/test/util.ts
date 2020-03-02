import { Server } from 'http';
import Koa, { Middleware } from 'koa';

export const startServer = (port: number, ...middlewares: Middleware[]): Server => {
  const app = new Koa();
  middlewares.forEach((middleware: Middleware) => {
    app.use(middleware);
  });
  return app.listen(port);
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
