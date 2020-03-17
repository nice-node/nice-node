---
id: util-watcher
title: watcher
---

创建 Statsd Client 单例。

## 用法
```js
import { watcher } from 'nice-node';

const metric = 'test';
const startTime = Date.now();

watcher.increment(`${metric}.request`);
watcher.timing(metric, startTime);
```

## 方法

### increment

增加计数。

#### 参数
##### metric
指标名称。

##### count
次数。默认是 `1` 。

### timing
记录时间差毫秒数。

#### 参数
##### metric
指标名称，最终输出会自动加上 `.time` 。

##### time
开始时间对象或毫秒数。如果参数为时间对象时，记录当前时间与时间对象的差值。如果参数为毫秒数时，直接记录该数字。

## 相关的环境变量
```
# 是否启用 watcher
WATCHER_ENABLE=false
# watcher host
WATCHER_HOST=
# 指标前缀
WATCHER_PREFIX=
```
