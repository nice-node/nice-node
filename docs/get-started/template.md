---
id: template
title: 解析 pug 模版
---

前面我们已经掌握了如何配置路由以及如何返回 json 数据，现在我们来学习如何显示网页。

每种服务器端编程语言都有自己的模版，在 nodejs 中，用得多的模版有 [ejs](http://npmjs.com/package/ejs) 、[pug](http://npmjs.com/package/ejs)。Nice-node 内置了 pug 的处理模块，出于依赖包体积大小的考虑，nice-node 并没有内置 pug 包，如果你希望使用 pug ，那需要手动安装以下依赖：
```sh
npm i koa-pug
```

接着，在实例化应用时打开 pug 开关即可：
```js
const app = new NiceNode({
  pug: {
    enable: true
  }
});
```
默认的模版根目录是 `templates` ，模版文件目录是 `templates/pages`，这些可以通过参数来修改：

```js
const app = new NiceNode({
  pug: {
    enable: true,
    options: {
      baseDir: 'test/fixtures/templates',
      viewPath: 'test/fixtures/templates/pages',
    }
  }
});
```

更多配置参数，可以参考 [pug api 文档](../api/util/pug.md) 。

