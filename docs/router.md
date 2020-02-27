---
id: router
title: 路由
---

一个网站由许多页面组成，页面之间通过 `url` 跳转。Nice-node 如何对外暴露一下新的 url 地址呢？这个就是地址路由。Nice-node 的路由在 koa-router 基础上创建的，存放在 `src/routes` 下的路由文件会自动注册到服务器，支持目录和目录嵌套。

```js
import Koa from 'koa';
import Router from 'koa-router';

const router = new Router();
router.get('/list', async (ctx: Koa.Context) => {
  ctx.body = 'list';
});

export default router.routes();
```

可以通过设置 `REQUIRE_ALL_ROUTES_ENABLE=false` 关闭路由自动注册功能，和该功能相关的配置参数有：
```
# 是否启用路由文件自动加载功能
REQUIRE_ALL_ROUTES_ENABLE=true
# 路由文件存放目录，${src}会替换成src或dist
REQUIRE_ALL_ROUTES_ROOR=${src}/routes
# 路由文件匹配(正则)规则，${ext}会替换成js或ts
REQUIRE_ALL_ROUTES_PATTERN=^([^.].*).${ext}(x)?$
```

>如果只是将请求代理到第三方服务、不需要对数据做任何加工处理的话，请使用 [proxy 中间件](./proxy.md)