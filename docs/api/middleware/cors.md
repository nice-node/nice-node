---
id: middleware-cors
title: cors
---

增加允许 ajax 跨域请求头的中间件。

## 用法
```js
const app = new NiceNode({
  cors: { enable: true }
});
```

## 参数

### enable
是否启用中间件，默认是 `false`。

## 相关的环境变量
```
CORS_ENABLE=false
```

## 相关链接
- [koa2-cors](https://www.npmjs.com/package/koa2-cors)
