---
id: static-file
title: static-file
---

一个让 webserver 能提供静态文件服务的中间件。

## 用法
```js
const app = new NiceNode({
  staticFile: {
    enable: true,
    options: {
      root: '.',
      koaStatic: {
        index: 'default.html'
      }
    }
  }
});
```

## 参数

### enable
设置是否启用中间件，默认是 `false`。

### options
`options` 是一个可选的对象参数，它可能包含下面其中一个参数：

#### root
必选参数，静态文件根目录。目录使用相对目录。如果需要设置多个目录，该值可以传入字符串数组。

#### koaStatic
`koaStatic` 是一个可选的对象参数，它可能包含下面其中一个参数：

##### maxage
浏览器缓存文件的毫秒数。默认值为 `0` 。

##### hidden
允许传输隐藏文件。默认值为 `false` 。

##### index
默认文件名称。默认值为 `index.html` 。

##### defer
是否推迟执行。如果设置为 `true` ，会先执行下游的中间件， `return next()` 之后才会执行本中间件。默认值为 `false` 。

##### gzip
是否支持 `gzip` 。当浏览器支持 `gzip` 或者请求的文件是 `.gz` 后缀名时，尽量返回 gzip 后的内容。默认值为 `true` 。

##### br
是否支持 `brotli` 。当浏览器支持 `brotli` 或者请求的文件是 `.br` 后缀名时，尽量返回 brotli 后的内容（注意：brotli 仅 `https` 支持）。默认值为 `true` 。

##### setHeaders
设置请求头。

##### extensions
默认后缀名数组。当请求地址中不包含文件后缀时，按着该数组中提供的后缀名搜索，先命中的返回。默认值为 `false` 。

## 相关的环境变量
```
# 是否启用静态资源服务器
STATIC_FILE_ENABLE=false
# 静态文件根目录，多个目录用逗号连接
STATIC_FILE_ROOR=static
```

## 相关链接
- [koa-static](https://www.npmjs.com/package/koa-static)
- [koa-send](https://github.com/koajs/send#setheaders)