---
id: http-proxy
title: 代理请求
---

在网站的整体架构中， node 的主要职责是 BFF(Backend for Frontend) ，这就意味着 node 服务多数情况下是数据中转站，做的是数据的上报和下发的工作。另外，由于在浏览器上无法做到跨域数据请求，因此，代理请求在 node 服务中使用得相当普遍。

要在 nice-node 中创建代理请求非常方便，在实例化时传入代理规则即可，下面的代码会将所有以 `/api` 开头的请求代理到 `http://api.test.com`。
```js
const app = new NiceNode({
  httpProxy: {
    '/api/:action': {
      // rewrite: (path) => path.replace('/api', ''),
      target: 'http://api.test.com'
    }
  }
});
```

## 参数

```ts
interface HttpProxyMiddlewareOptions {
  [key: string]: {
    target: string;
    logs?: boolean;
    rewrite?: (path: string) => string;
  }
}
```

* `HttpProxyMiddlewareOptions.key` 网址匹配规则，和 [koa-router](https://www.npmjs.com/package/koa-router) 一样，都是使用的  [path-to-regexp](https://www.npmjs.com/package/path-to-regexp)
* `HttpProxyMiddlewareOptions.key.target` 代理的目标服务器域名
* `HttpProxyMiddlewareOptions.key.logs` 是否输出日志，默认为 `false`
* `HttpProxyMiddlewareOptions.key.rewrite` 重写地址的函数，入参为当前请求的地址
