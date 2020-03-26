---
id: qconfig
title: qconfig
---

使用 qconfig 的模块。

> 需要手动安装依赖包 `npm install @qnpm/qconfig-client-plus`

## 用法
```js
const app = new NiceNode({
  pug: {
    enable: true
  }
});
```

## 参数

### enable
是否启用中间件，默认是 `true`。

### options
`options` 是一个继承于 [pug 选项](https://pugjs.org/api/reference.html#options) 的可选对象参数，它可能包含下面其中一个参数：

#### basedir
Pug 文件(如 helper、pug)根目录，会影响模版文件中根目录的位置，如 `extends /layout/default.pug` 。默认值为 `process.cwd()`。

#### viewPath
Pug 模版文件位置。默认值为 `process.cwd()` 。

#### locals
传入 pug 模版的变量。

#### helperPath
helper 文件的位置。

## 相关的环境变量
```
# 是否启用 pug
PUG_ENABLE=false
# 模版根目录
PUG_BASEDIR=templates
# 模版view文件目录
PUG_VIEWPATH=templates/pages
```

## 相关链接
- [koa-pug](https://www.npmjs.com/package/koa-pug)
