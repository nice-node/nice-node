---
id: watcher
title: 添加打点监控
---
打点常用于网站统计，比如页面访问次数统计、接口调用耗时统计。
打点和日志都是网站运营的重要手段，但又略有不同：
- 日志记录了单个 case 的详细信息，可以用来做具体 case 分析
- 打点记录的总量，但独看一个时间的统计意义不大，看一段时间的整体趋势能帮忙我们快速发现问题，比如网站请求数大幅度减少了、某个接口的耗时突然增加了，这些信息能准确的反映网站的局部的健康状况。

Nice-node 提供了3种打点方式：
## 在路由中自动打点
假设我们需要记录首页的访问次数和响应时间，我们可以在首页的路由中增加 watcher 中间件。

```js
import Koa from 'koa';
import Router from 'koa-router';
import { mwWatcher } from 'nice-node';

const router = new Router();
router.get('/', mwWatcher('home'), async (ctx: Koa.Context) => {
  ctx.body = 'Hello world';
});
```
这番操作后，每次访问 `/` ，在 watch 监控的 `home` 节点的总数指标会加 1 ，`home.time` 节点会记录本次访问的时间，这个时间和 access-log 记录的时间是一样的。

更多配置参数，可以参考 [watcher api 文档](../api/middleware/watcher.md) 。

## 在 request 请求中自动打点
Node 经常需要请求第三方数据接口，第三方接口的稳定性决定了 node 服务的稳定性，因此时刻掌握第三方服务的健康状态也非常重要。

Nice-node 封装了 `request` 模块用于第三方接口请求，它是一个 axios 实例，通过对实例的拦截器编程，实现了在请求第三方接口时记录请求次数、错误次数、请求时长信息，错误次数里又细分了请求超时间错误。

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

上面的代码会将请求相关信息记录在 api_list 节点下。

更多配置参数，可以参考 [request api 文档](../api/util/request.md) 。

## 开发者手动打点

除了上面2种自动打点方式，我们还能手动在需要打点的调用 watcher 方法。

```js
import { watcher } from 'nice-node';

const metric = 'test';
const startTime = Date.now();

watcher.increment(`${metric}.request`);
watcher.timing(metric, startTime);
```

更多配置参数，可以参考 [watcher api 文档](../api/util/watcher.md) 。
