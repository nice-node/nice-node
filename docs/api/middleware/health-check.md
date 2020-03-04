---
id: middleware-health-check
title: health-check
---

提供 Nginx 心跳检查时需要的网址的中间件。

机器在发布前需要做下线操作，避免发布期间有用户访问，导致服务异常。为了实现机器的灵活上下线，发布系统和 Nginx 做了约定，使用项目根目录下的 `healthcheck.html` 作为机器上下线的标志文件。在发布系统准备发布前，会先把目标机器上的 `healthcheck.html` 文件删掉，实现目标机器下线；当发布完成时，再创建一个 `healthcheck.html` 文件。
Nginx 怎么工作的？Nginx 会定时轮训访问 `/healthcheck.html` ，根据返回状态来决定当前机器是否“活着”，返回状态码 `200` 表示机器正常，可以对外提供服务，正常给机器做负载均衡、分流；返回状态码 `404` 表示机器需要下线，Nginx 将不会再给当前机器分配流量。

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
设置 check urls 的访问地址。请保证该地址和发布系统中配置 check-urls 的地址一致，默认值为 `/healthcheck.html`。

## 相关的环境变量
```
HEALTH_CHECK_ENABLE=true
# health check 地址
HEALTH_CHECK_ENDPOINT=/healthcheck.html
```