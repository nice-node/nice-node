---
id: router
title: 路由
---

网站由许多网页组成，网页之间通过 url 跳转来联系，也就是常说的路由。Nice-node 用的是 [koa-router](https://www.npmjs.com/package/koa-router) ，下面我们为网站增加一个新的路由：

1. 新建路由文件 `src/routes/list.ts` 。
    ```js
    // src/routes/list.ts
    import Koa from 'koa';
    import Router from 'koa-router';

    const router = new Router();
    router.get('/list', async (ctx: Koa.Context) => {
      ctx.body = 'list';
    });

    export default router.routes();
    ```
1. 将路由中间件配置到 nice-node 中。
    ```js
    // index.ts
    import NiceNode from 'nice-node';
    import listRouter from './routes/list';

    const { PORT } = process.env;
    const app = new NiceNode();

    app.server.use(listRouter);

    app.server.listen(PORT, () => {
      console.log(`\n🚀 http://localhost:${PORT}`);
    });
    ```

1. 重启服务后，访问 `http://localhost:3000/list` 就能看到新的网页了。

Nice-node 具有路由自动注册功能，该功能是把指定目录（默认是 `src/routes`）下的路由文件自动注册到 nice-node ，包含该目录下的文件、目录和目录嵌套。默认该功能是关闭的。可以使用下面两种方式来启用路由自动注册功能：
- 设置环境变量 `AUTO_REGISTER_ROUTER_ENABLE=true` 。和该功能相关的其他环境变量配置参数及默认值如下：
    ```
    ################################
    # autoRegisterRouter
    ################################
    # 是否启用路由文件自动加载功能
    AUTO_REGISTER_ROUTER_ENABLE=false
    # 路由文件存放目录，{src}会替换成src或dist
    AUTO_REGISTER_ROUTER_ROOR={src}/routes
    # 路由文件匹配(正则)规则，{ext}会替换成js或ts
    AUTO_REGISTER_ROUTER_PATTERN=^([^.].*).{ext}(x)?$
    ```

- 实例化 nice-node 时传入 `autoRegisterRouter.enable: true` 参数，相关的 js 参数如下：
    ```js
    interface AutoRegisterRouterOptions {
      enable?: boolean;
      options?: {
        root?: string;
        pattern?: string;
      }
    }
    ```

现在我们启用路由自动注册功能，将刚才的代码改一下：
```js
// index.ts
import NiceNode from 'nice-node';

const { PORT } = process.env;

const app = new NiceNode({
  autoRegisterRouter: {
    enable: true
  }
});

app.server.listen(PORT, () => {
  console.log(`\n🚀 http://localhost:${PORT}`);
});
```

这样同样能看到 `http://localhost:3000/list` 页面。

>如果只是将请求代理到第三方服务、不需要对数据做任何加工处理的话，请使用 [http-proxy 中间件](./http-proxy.md)

## 相关链接
- [如何修改环境变量?](./profiles.md)
