---
id: mysql
title: mysql
---

连接 mysql-pxc 的模块。

## 用法
```js
import { initMysql, query } from 'nice-nodes';

const preStart = async () => {
  await initMysql({
    enable: true,
    options: {
      zkConnection: 'xx',
      namespace: 'xx',
      host: 'xx',
      port: 'xx',
      user: 'xx',
      password: 'xx',
      database: 'xx'
    }
  });

  // async function test() {
  //   const sql = knex.select('*').from('account').toString();
  //   // const sql = 'show tables;';
  //   const data = await query(sql);
  //   return data;
  // }
  // test().then((data) => {
  //   console.log('data:', data);
  // });
};

const start = async () => {
  const { PORT } = process.env;
  const app = new NiceNode();

  // 需要在 query 之前建立 mysql 连接
  // 保险起见在 mysql 连接建立后再启动 web 服务
  await preStart();

  app.server.listen(PORT, () => {
    console.log(`\n🚀 http://localhost:${PORT}`);
  });
};
```

## 参数

### enable
是否启用中间件，默认是 `false`。

### options
`options` 是一个可选对象参数，它可能包含下面其中一个参数：

#### zkConnection
zk 服务器地址和端口。

#### namespace
zk 命名空间。

#### host
mysql 服务器地址。

#### port
mysql 服务器端口。

#### user
mysql 用户名。

#### password
mysql 用户密码。

#### database
mysql 库名。

#### connectionLimit
mysql 最大连接数。

#### acquireTimeout
acquireTimeout。

## 相关的环境变量
```
# 是否启用 mysql
MYSQL_ENABLE=false
# zk 服务器地址和端口
MYSQL_ZKCONNECTION=
# zk 命名空间
MYSQL_NAMESPACE=
# mysql 服务器地址
MYSQL_HOST=
# mysql 服务器端口
MYSQL_PORT=
# mysql 用户名
MYSQL_USER=
# mysql 用户密码
MYSQL_PASSWORD=
# mysql 库名
MYSQL_DATABASE=
# mysql 最大连接数
MYSQL_CONNECTIONLIMIT=5
#
MYSQL_ACQUIRETIMEOUT=2000
# mysql 超时时间（毫秒）
MYSQL_TIMEOUT=3000
```

## 相关链接
- [koa-pug](https://www.npmjs.com/package/koa-pug)
