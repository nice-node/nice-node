---
id: middleware-check-urls
title: check-urls
---

提供发布系统 check-urls 时需要的网址的中间件。

## 用法
```js
const app = new NiceNode({
  checkUrl: { enable: true }
});
```

## 参数

### enable
设置是否启用中间件，默认是 `true`。

### options
`options` 是一个可选的对象参数，它可能包含下面其中一个参数：

#### endpoint
设置 check urls 的访问地址。请保证该地址和发布系统中配置 check-urls 的地址一致，默认值为 `/check_urls`。

## 相关的环境变量
```
CHECK_URLS_ENABLE=true
# check url 地址
CHECK_URLS_ENDPOINT=/check_urls
```