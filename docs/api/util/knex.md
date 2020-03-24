---
id: knex
title: knex
---

用 [knex](http://knexjs.org) 拼接 SQL 语句。

## 用法
```js
import { knex } from 'nice-node';

const sql = knex.select('*').from('account').toString();
console.log(sql); // select * from `account`;
```

## 相关的环境变量
```
# 数据库类型
KNEX_CLIENT=mysql
```

## 相关链接
- [knex](http://knexjs.org)
