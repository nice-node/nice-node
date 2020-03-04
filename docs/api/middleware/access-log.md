---
id: middleware-access-log
title: access-log
---

记录网站访问日志的中间件。可以通过修改配置来实现以下自定义：
- 日志格式
- 日志文件保存路径
- 日志文件分割策略

## 用法

## 参数

### enable
是否启用访问日志中间件，默认是 `false`。

### options
`options` 是一个可选的对象参数，它可能包含下面其中一个参数：

#### format
访问日志格式。

## 相关链接
- [koa-morgan](https://github.com/koa-modules/morgan)
- [file-stream-rotator](https://github.com/rogerc/file-stream-rotator)
