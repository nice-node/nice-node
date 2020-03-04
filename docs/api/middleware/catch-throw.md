---
id: middleware-catch-throw
title: catch-throw
---

捕捉 koa 异常的中间件，通常和 [validate 中间件](./validate.md)一起使用，实现请求参数校验功能。

根据 `header.accept` 类型返回适合的数据。
- 当请求类型为 `json` 时，返回状态码 `200` ，数据格式为 json 。
- 当请求类型不是 `json` 时，返回状态码 `500` ，数据格式为文本。

## 用法
```js
const app = new NiceNode({
  catchThrow: { enable: true }
});
```

## 参数

### enable
设置是否启用中间件，默认是 `true`。

## 相关的环境变量
```
CATCH_THROW_ENABLE=true
```

## 相关链接
- [validate 中间件](./validate.md)
