---
id: logger
title: 记录日志
---

网站常用有2种日志：
- 访问日志
  Nice-node 提供了记录网站的所有请求信息的功能。这个记录的是外部访问。
- 代码运行日志
  这个需要开发者在写代码时手动调用 logger 函数，在需要记录日志的地方预先埋好代码。

我们来分别看看这2种日志如何使用。

## 访问日志
这个很简单，直接打开开关即可：
```js
const app = new NiceNode({
  accessLog: {
    enable: true
  }
});
```
启动服务，并访问一个地址后，你能看到类似 `logs/access.2020-02-06-09.log` 这样带时间戳的日志文件，打开文件看一下访问日志长什么样：
```
::1 - [2020-02-06 09:56:17] "GET / HTTP/1.1" 200 66 - 855.919 ms "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:72.0) Gecko/20100101 Firefox/72.0"
```
里面记录了每一个请求，包含IP地址、请求发起的时间、请求方式、请求地址、响应时间、userAgent等等信息，需要使用何种格式、记录哪些信息，这些都可以配置。更多配置参数，可以参考 [access-log api 文档](../api/middleware/access-log.md) 。

## 代码运行日志
代码运行日志的主要目的是辅助开发者在网站上线后能了解网站运行状况，是定位问题、改善网站的重要手段和参考依据。什么时候该打日志、什么位置该打日志，大家可以自行搜索，这里不展开说明。

Nice-node 封装了日志方法，便于开发者使用：
```js
import { logger } from 'nice-node';

logger.info('hello world');
```
如果是在中间件中，可以在 `ctx` 中直接拿到 logger 方法：
```
ctx.logger.error('something is wrong');
```
日志默认会写到类似 `logs/combined.2020-02-06-09.log` 的文件中，如果是 `error` 类型日志，日志还会额外写到 `logs/error.2020-02-06-09.log` 日志文件。

更多配置参数，可以参考 [logger api 文档](../api/util/logger.md) 。
