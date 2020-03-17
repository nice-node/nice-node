---
id: watcher
title: watcher
---

自动记录页面请求次数和请求时间的 koa-router 中间件。底层调用的是 [watcher 模块](../util/watcher.md)。注意：该中间件是页面路由中间件，使用上和 koa 中间件有差异。

## 用法
```js
import Koa from 'koa';
import Router from 'koa-router';
import { mwWatcher } from 'nice-node';

const router = new Router();
router.get('/', mwWatcher('home'), async (ctx: Koa.Context) => {
  ctx.body = 'Hello world';
});
```

## 参数

### metric
监控指标名称。请求次数和请求时间的指标名称分别为 `{metric}` 和 `{metric}.time` 。

## 和 request 的区别
- watcher 中间件是记录**页面**的请求次数和请求时间。
- [request](../util/request.md) 模块是记录第三方**接口**的请求次数和请求时间。
