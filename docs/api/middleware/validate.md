---
id: validate
title: validate
---
用 [joi](https://hapi.dev/family/joi/) schema 拦截验证请求参数的中间件。

## 用法
```js
import Router from 'koa-router';
import { mwValidate } from 'nice-node';

const app = new NiceNode();
const router = new Router();
router.get('/', mwValidate({
  query: {
    name: Joi.string().required()
  }
}), async (ctx: Koa.Context) => {
  ctx.status = 200;
});
app.server.use(router.routes());
```

## 参数

### options
`options` 是一个可选的对象参数，它可能包含下面其中一个参数：

#### headers
校验请求头的 joi schema。

#### params
校验请求参数的 joi schema。

#### query
校验 url 参数的 joi schema。

#### body
校验请求体的 joi schema。

## 相关链接
- [@hapi/joi](https://hapi.dev/family/joi/)
