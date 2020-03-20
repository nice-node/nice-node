---
id: static
title: 提供静态文件服务
---

网站最基础的功能是提供静态文件服务。出于性能的考虑，现在面向用户的外网服务基本上都是“动静分离”，也就是说静态文件和动态模版是分开成不同的域名和服务。不过对于一些内部系统，“动静分离”的要求不太高，有时候为了方便，我们也会在 web 服务上提供静态文件服务，如 `favicon.ico`。

Nice-node 应用内置了 (koa-static)[https://npmjs.org/package/koa-static] ，默认是关闭的，默认目录是 `static` （注意是项目根目录）。下面我们来看看具体怎么使用：

1. 创建应用
    ```js
    const app = new NiceNode({
      staticFile: {
        enable: true
      }
    });
    ```
1. 在项目根目录新建目录 `static`
    ```sh
    mkdir static
    ```
1. 在 `static` 目录下创建 `test.txt`
    ```sh
    echo test > static/test.txt
    ```
访问 `http://localhost:3000/test.txt` ，发现能看到 test.txt 的内容。

如果想设置多个 static 目录，可以在创建 nice-node 实例时传入多个目录地址：
```js
const app = new NiceNode({
  staticFile: {
    enable: true,
    options: {
      root: ['static', 'public']
    }
  }
});
```
更多配置参数，可以参考 [static-file api 文档](../api/middleware/static-file.md) 。
