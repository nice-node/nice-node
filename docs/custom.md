---
id: custom
title: 自定义 web 服务器
---

Nice-node 使用 [koa2](https://koajs.com/) 作为 web 服务器，所有 koa2 中间件都可以在 nice-node 中使用。 可以通过[源码](https://github.com/zhongzhi107/nice-node/blob/master/packages/nice-node/src/server.ts#L48)查看 nice-node 使用的中间件。


## 增加中间件
`nicenode.server` 是 `koa` 实例，你可以方便的给 koa 添加中间件：

```js
import NiceNode from 'nice-node';
import json from 'koa-json';

const app = new NiceNode();
app.server.use(json());
```

## 自定义服务器
如果 nice-node 满足不了你的实际需求，你可以通过重新定义 nice-node 的 `server` 对象来创建 web 服务器：
```js
import Koa from 'koa';
import NiceNode, { mwCheckUrls, mwHealthCheck } from 'nice-node';

const app = new NiceNode();
app.server = new Koa();
// 这里自定义 koa
app.server.use(mwCheckUrls);
app.server.use(mwHealthCheck);
app.server.listen(3000, () => {
  console.log('nice-node started.');
});
```
