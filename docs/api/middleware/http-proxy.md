---
id: middleware-http-proxy
title: http-proxy
---

提供请求代理的中间件。

## 用法
```js
const app = new NiceNode({
  httpProxy: {
    '/api/:action': {
      target: 'http://api.test.com'
    }
  }
});
```

## 参数
参数是一个 object 对象。

### {key}
路由匹配规则。和 [koa-router](https://www.npmjs.com/package/koa-router) 一样，都是使用的  [path-to-regexp](https://www.npmjs.com/package/path-to-regexp)。

### options
`options` 是一个可选的对象参数，它可能包含下面其中一个参数：

#### target
必选参数，代理的目标服务器域名。

#### logs
是否输出日志。默认值为 `false`。

#### rewrite
重写地址的函数。当前请求的地址会当作参数传入。

## 相关链接
- [axios](https://www.npmjs.com/package/axios)
