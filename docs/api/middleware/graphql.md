---
id: middleware-graphql
title: graphql
---

创建 GraphQL HTTP 服务的中间件。

封装了 [koa-graphql](https://github.com/chentsulin/koa-graphql)，该中间件注册后，会自动增加一个 /:endpoint 的路由。

## 用法
```js
const app = new NiceNode({
  graphql: {
    enable: true,
    options: {
      endpoint: '/graphql'
    }
  }
});
```

## 参数

### enable
是否启用中间件，默认是 `true`。

### options
`options` 是一个可选的对象参数，它可能包含下面其中一个参数：

#### options.endpoint
Graphql 地址。默认值为 `/graphql` 。

#### options.typedefsPattern
Scheme 文件匹配格式。默认值为 `{src}/graphql/**/*.graphql` 。

#### options.resolversPattern
Resolver 文件匹配格式。默认值为 `{src}/graphql/**/resolver.{ext}` 。

#### koaGraphql
`koaGraphql` 是一个可选的对象参数，它可能包含下面其中一个参数：

##### context
传递到本中间件上下文的值。默认值为 `ctx` 。

##### pretty
是否美化输出 `JSON` 。默认值为 `false` 。

##### formatError
错误信息格式化函数。

##### validationRules
额外增加的请求验证规则。

##### extensions
在返回结果中增加 `extensions` 字段的函数。

##### graphiql
是否使用 `GraphiQL`。如果设置为 `true` ，那么访问 `/graphiql` 就能在浏览器里展示 GraphiQL ，推荐在开发环境下开启该功能。

##### fieldResolver
A resolver function to use when one is not provided by the schema. If not provided, the default field resolver is used (which looks for a value or method on the source value with the field's name).

## 相关的环境变量
```
# 是否启用 graphql
GRAPHQL_ENABLE=false
# graphql 地址
GRAPHQL_ENDPOINT=/graphql
# graphql scheme 文件匹配格式
GRAPHQL_TYPEDEFS_PATTERN={src}/graphql/**/*.graphql
# graphql resolver 文件匹配格式
GRAPHQL_RESOLVERS_PATTERN={src}/graphql/**/resolver.{ext}
```

## 相关链接
- [koa-graphql](https://www.npmjs.com/package/koa-graphql)
- [GraphiQL](https://github.com/graphql/graphiql)