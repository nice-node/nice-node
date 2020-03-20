---
id: middleware-logger
title: logger
---

在 `ctx` 中注入 `logger` 方法的中间件，方便使用。

## 用法
```js
const app = new NiceNode({
  logger: {
    enable: true
  }
});
```
启用后，在中间件里可以使用 `ctx.logger` 写日志，日志文件的配置在 [logger](../util/util-logger.md) 模块中设置。
```js
ctx.logger.info('xxx');
```

## 参数

### enable
设置是否启用中间件，默认是 `true`。

## 相关的环境变量
```
LOGGER_ENABLE=true
```

## 相关链接
- [logger](../util/util-logger.md)
