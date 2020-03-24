---
id: auto-register-router
title: auto-register-router
---

自动加载路由文件目录。

## 用法
```js
const app = new NiceNode({
  autoRegisterRouter: {
    enable: true,
    options: {
      root: 'test/fixtures/routes'
    }
  }
});
```

## 参数

### enable
是否启用中间件，默认是 `true`。

### options
`options` 是一个可选对象参数，它可能包含下面其中一个参数：

#### root
路由文件存放目录，{src} 会替换成 src 或 dist 。默认值为 `{src}/routes`。

#### pattern
路由文件匹配(正则)规则，{ext} 会替换成 js 或 ts 。默认值为 `^([^.].*).{ext}(x)?$` 。

## 相关的环境变量
```
# 是否启用路由文件自动加载功能
AUTO_REGISTER_ROUTER_ENABLE=false
# 路由文件存放目录，{src}会替换成src或dist
AUTO_REGISTER_ROUTER_ROOR={src}/routes
# 路由文件匹配(正则)规则，{ext}会替换成js或ts
AUTO_REGISTER_ROUTER_PATTERN=^([^.].*).{ext}(x)?$
```