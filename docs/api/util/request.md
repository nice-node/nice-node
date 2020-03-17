---
id: request
title: request
---
具有打点功能拦截器的 axios 实例。用于记录 node 请求第三方接口的请求。

>axios@>=0.19 不允许在 axios config 中自定义配置项，因此改成通过 config.headers 存储和传递变量

config.headers.watcher 包含：
- config.headers.watcher.metric {string} 打点名称
- config.headers.watcher.startTime {date} 请求开始时间

记录的打点信息有：
- increment(`${metric}.request`) 请求总次数
- increment(`${metric}.error`)   请求错误次数
- increment(`${metric}.timeout`) 请求超时次数
- timing(metric, startTime);     请求耗时

## 用法
```js
import { request } from 'nice-node';

const url = 'http://api.test.com/test';
const requestOptions = {
  headers: {
    watcher: {
      metric: 'api_list'
    }
  }
};

request.get(url, requestOptions);
```

## 和 request 的区别
- [watcher 中间件](../middleware/watcher.md) 是记录**页面**的请求次数和请求时间。
- request 模块是记录第三方**接口**的请求次数和请求时间。
