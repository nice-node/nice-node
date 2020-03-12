---
id: custom
title: 自定义 web 服务器
---

Nice-node 使用 [koa2](https://koajs.com/) 作为 web 服务器，所有 koa2 中间件都可以在 nice-node 中使用。 通过查看 [源码](https://github.com/zhongzhi107/nice-node/blob/master/packages/nice-node/src/server.ts#L48) 能更深入的了解中间件是如何在 nice-node 中运行的。


## 增加中间件
`nicenode.server` 返回的是一个 `koa` 实例，你可以方便的给它添加中间件。下面的代码会在 nide-node 中间件末尾增加 `koa-json` 中间件：

```js
import NiceNode from 'nice-node';
import json from 'koa-json';

const app = new NiceNode();
app.server.use(json());
```

## 自定义服务器
如果 nice-node 满足不了你的实际需求，你可以通过重新给 nice-node 的 `server` 赋值的方式来创建新的 web 服务器：
```js
import Koa from 'koa';
import NiceNode, { mwCheckUrls, mwHealthCheck } from 'nice-node';

const app = new NiceNode();

app.server = new Koa(); // 这里定义一个新的 koa 实例

app.server.use(mwCheckUrls);
app.server.use(mwHealthCheck);
app.server.listen(3000, () => {
  console.log('my nice-node server started.');
});
```
