---
id: middleware-body-parser
title: body-parser
---

Node.js body parsing middleware. Support json, form and text type body.

## 用法
```js
const app = new NiceNode({
  bodyParser: {
    enable: true,
    options: {
      jsonLimit: '2mb'
    }
  }
});
```

## 参数

### enable
是否启用中间件，默认是 `true`。

### options
`options` 是一个可选的对象参数，它可能包含下面其中一个参数：

#### enableTypes
允许使用 body-parser 的请求类型。默认值为 `['json', 'form']`。

#### encoding
请求的编码。默认值为 `utf-8` 。

#### formLimit
 `urlencoded` 类型消息体最大长度。超过最大长度时会返回 413 的错误状态码。默认值为 `56kb` 。

#### jsonLimit
 `json` 类型消息体最大长度。默认值为 `1mb` 。

#### textLimit
 `text` 类型消息体最大长度。默认值为 `1mb` 。

#### strict
为 `true` 时， JSON parser 只能接收数组和对象类型。默认值为 `true` 。

#### detectJSON
判断请求是否为 `json` 的函数。默认值为 `null` 。
```js
new NiceNode({
  bodyParser: {
    enable: true,
    options: {
      detectJSON: function (ctx) {
        return /\.json$/i.test(ctx.path);
      }
    }
  }
});
```

#### extendTypes
支持的展开类型。
```js
new NiceNode({
  bodyParser: {
    enable: true,
    options: {
      extendTypes: {
        json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
      }
    }
  }
});
```

#### onerror
 body-parser 出错时的处理函数。
```js
new NiceNode({
  bodyParser: {
    enable: true,
    options: {
      onerror: function (err, ctx) {
        ctx.throw('body parse error', 422);
      }
    }
  }
});
```

## 相关的环境变量
```
BODY_PARSER_ENABLE=true
```

## 相关链接
- [koa-bodyparser](https://www.npmjs.com/package/koa-bodyparser)
- [co-body](https://github.com/tj/co-body)
