---
id: util-logger
title: logger
---

记录代码运行日志的中间件。可以通过修改配置来实现以下自定义：
- 日志输出方式
- 日志格式
- 日志文件保存路径
- 日志文件分割策略

## 用法

```js
import { logger } from 'nice-node';

logger.debug('xx'); // <- 仅开发环境输出日志
logger.verbose('xx'); // <- 仅开发环境输出日志
logger.info('xx'); // <- 所有环境都输出日志
logger.warn('xx'); // <- 所有环境都输出日志
logger.error('xx'); // <- 所有环境都输出日志
```

## 相关的环境变量
```
# 日志等级[debug/verbose/info/warn/error]
LOG_LEVEL=info
# 日志文件保存的相对目录
LOG_ROOT=logs
# 日志文件名中的日期格式
LOG_FILE_DATE_PATTERN=YYYY-MM-DD-HH
# 日志文件是否压缩
LOG_FILE_ZIPPED_ARCHIVE=false
# 日志记录中时间格式
LOG_DATEFORMAT=yyyy-MM-dd HH:mm:ss
```

## 相关链接
- [winston](https://www.npmjs.com/package/winston)
- [winston-daily-rotate-file](https://www.npmjs.com/package/winston-daily-rotate-file)
