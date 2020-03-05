---
id: middleware-access-log
title: access-log
---

记录网站访问日志的中间件。可以通过修改配置来实现以下自定义：
- 日志格式
- 日志文件保存路径
- 日志文件分割策略

## 用法

## 参数

### enable
是否启用访问日志中间件，默认是 `false`。

### options
`options` 是一个可选的对象参数，它可能包含下面其中一个参数：

#### format
访问日志格式。默认是 `:remote-addr - [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":referrer" ":user-agent"` 。

#### root
日志文件保存的相对目录。默认是 `logs` 。

#### timeStampFormat
记录中的时间格式。默认是 `yyyy-MM-dd HH:mm:ss` 。

#### buffer
输出日志前是否在缓冲区暂存，默认是 `false` 。设置为 `true` 时，默认缓存 1000 毫秒。

#### immediate
是否在 request 过程立即输出日志，默认是 `false` 。通常是在 response 过程才输出日志，当设置为 `true` 时，将在 request 过程输出日志，即使服务器崩了，由于是在 request 过程输出日志，所以 response 中包含的信息（如：状态码、返回内容长度等）将不会被输出。

#### skip
用于确定是否跳过日志记录的函数，默认是 `(req: any) => ACCESS_LOG_SKIP_ENDPOINTS.split(',').includes(req.baseUrl)` 。函数执行时将传入 `req` 和 `res` 两个参数。

#### stream
用于输出日志的输出流参数配置，`stream` 是一个可选的对象参数，它可能包含下面其中一个参数：

##### filename
包含完整路径的文件名称。

##### frequency
日志文件分割频率。取值为：['daily'(每天), 'custom'(自定义), 'test'(每分钟)]

##### verbose
当切割文件或重命名文件时，是否输出在标准输出上输出操作日志，默认是 `false` 。

##### date_format
日志文件名称中的 [moment](https://momentjs.com/docs/#/displaying/format/) 日期格式，用来代替日志文件名中的 `%DATE%` 。

##### size
Max size of the file after which it will rotate. It can be combined with frequency or date format. The size units are 'k', 'm' and 'g'. Units need to directly follow a number e.g. 1g, 100m, 20k.

##### max_logs
Max number of logs to keep. If not set, it won't remove past logs. It uses its own log audit file to keep track of the log files in a json format. It won't delete any file not contained in it. It can be a number of files or number of days. If using days, add 'd' as the suffix.

##### audit_file
 Location to store the log audit file. If not set, it will be stored in the root of the application.

##### end_stream
 End stream (true) instead of the destroy (default: `false`). Set value to true if when writing to the stream in a loop, if the application terminates or log rotates, data pending to be flushed might be lost.

##### file_options
An object passed to the stream. This can be used to specify flags, encoding, and mode. See https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options. Default `{ flags: 'a' }`.

##### utc
Use UTC time for date in filename. Defaults to `false`.

##### extension
File extension to be appended to the filename. This is useful when using size restrictions as the rotation adds a count (1,2,3,4,...) at the end of the filename when the required size is met.

##### watch_log
Watch the current file being written to and recreate it in case of accidental deletion. Defaults to `false`.

##### create_symlink
Create a tailable symlink to the current active log file. Defaults to `false`.

##### symlink_name
Name to use when creating the symbolic link. Defaults to `current.log`.

## 相关的环境变量
```
# 是否记录访问日志
ACCESS_LOG_ENABLE=true
# 访问日志格式
ACCESS_LOG_FORMAT=:remote-addr - [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":referrer" ":user-agent"
# 输出日志前是否在缓冲区暂存
ACCESS_LOG_BUFFER=false
# 是否在 request 过程立即输出日志
ACCESS_LOG_IMMEDIATE=false
# 是否跳过日志记录的请求地址，多个用逗号隔开
ACCESS_LOG_SKIP_ENDPOINTS=/healthcheck.html,/favicon.ico
# 访问日志文件名格式
ACCESS_LOG_FILENAME=access.%DATE%.log
# 访问日志文件名中的日期格式
ACCESS_LOG_FILENAME_DATEFORMAT=YYYY-MM-DD-HH
# 访问日志文件切分频率
ACCESS_LOG_FREQUENCY=daily
# 访问日志中时间格式
ACCESS_LOG_TIME_STAMP_FORMAT=yyyy-MM-dd HH:mm:ss
# 日志文件保存的相对目录
LOG_ROOT=logs
```

## 相关链接
- [koa-morgan](https://github.com/koa-modules/morgan)
- [file-stream-rotator](https://github.com/rogerc/file-stream-rotator)
