# Nice Node

## Status

[![npm version](https://badge.fury.io/js/nice-node.svg)](https://badge.fury.io/js/nice-node)
[![Build Status](https://travis-ci.com/nice-node/nice-node.svg?branch=master)](https://travis-ci.com/nice-node/nice-node)
[![Coverage Status](https://coveralls.io/repos/github/qails/qails/badge.svg?branch=master)](https://coveralls.io/github/qails/qails?branch=master)
[![Dependency Status](https://david-dm.org/nice-node/nice-node.svg)](https://david-dm.org/nice-node/nice-node)

## 安装
```sh
npm i && npm start
```

## 命令
- 启动本地服务
    ```sh
    # 其他环境使用 PM2 启动服务
    npm run start
    ```
- 编译工程
    ```sh
    # 编译
    npm run build

    # 编译并预览编译结果
    npm run start:prod
    ```
- 代码检查
    ```sh
    # 检查并返回错误结果
    npm run lint
    # 检查并尝试修复
    npm run lint:fix
    ```
- 运行测试用例
    ```sh
    npm test
    ```

- 查看代码覆盖率
    ```sh
    npm run cover
    ```

## 特点
- [x] 基于 `dotenv` 的配置系统
- [x] 区分环境的配置文件
- [x] 内置 eslint
- [x] 内置 husky
- [x] 使用统一的 eslint 规则
- [x] 搭建新项目的手脚架工具，能一键创建项目
- [x] 提供基础的 tsconfig.json
- [x] 支持记录访问日志
- [x] 内置日志函数
- [x] 支持打点监控（watcher）
- [x] 结合 PM2 ，提供基础的 ecosystem.config.js
- [x] 支持静态文件服务（可选）
- [x] 支持 pug 模版（可选）
- [x] 自动加载路由功能（可选）
- [x] 支持 GraphQL（可选）
- [x] 可配置的代理转发（可选）
- [x] .syncignore
- [x] koa-static 封装成中间件有问题
- [x] proxy post 有问题
- [x] 集成 portal 发布
  - [x] deploy_scripts
  - [x] 定时任务同步机制
  - 代码覆盖率
- [ ] qconfig
- [ ] ssr
- [ ] 兼容 windows 系统
- [x] nicenode.env 参数检查
- 找 cm 将发布参数设置打包成nice-node类型，内置到portal系统
- requireAllRoutes 封装成中间件
- [ ] unit test
  - [ ] bin
  - [ ] http-proxy 对 post 的模拟没写用例

## 文档目录
### 新手入门
- [x] [创建新项目](./docs/get-started/create.md)
- [x] [路由](./docs/get-started/router.md)
- [x] [profiles](./docs/get-started/profiles.md)
- [x] [配置和环境变量](./docs/get-started/configuration.md)
- [x] [代理请求](./docs/get-started/http-proxy.md)
- [ ] [解析 pug 模版](./docs/get-started/template.md)
- [ ] [提供静态文件服务](./docs/get-started/static.md)
- [ ] [提供 GraphQL 服务](./docs/get-started/graphql.md)
- [ ] [记录日志](./docs/get-started/logger.md)
- [ ] [添加打点监控](./docs/get-started/watcher.md)
- [x] [自定义 web 服务器](./docs/get-started/custom.md)
- [x] [部署项目](./docs/get-started/deploy.md)
- [x] [PM2 管理多个网站](./docs/other/pm2.md)

### API
#### 命令行
- [ ] [nice-node](./docs/api/bin/nice-node.md)
#### 中间件
- [x] [access-log](./docs/api/middleware/access-log.md)
- [x] [body-parser](./docs/api/middleware/body-parser.md)
- [x] [catch-throw](./docs/api/middleware/catch-throw.md)
- [x] [check-urls](./docs/api/middleware/check-urls.md)
- [x] [graphql](./docs/api/middleware/graphql.md)
- [x] [health-check](./docs/api/middleware/health-check.md)
- [x] [http-proxy](./docs/api/middleware/http-proxy.md)
- [x] [logger](./docs/api/middleware/logger.md)
- [x] [static-file](./docs/api/middleware/static-file.md)
- [ ] [validate](./docs/api/middleware/validate.md)
- [ ] [watcher](./docs/api/middleware/watcher.md)
#### 公用模块
- [ ] [ecosystem-config](./docs/api/util/ecosystem-config.md)
- [ ] [logger](./docs/api/util/logger.md)
- [ ] [pug](./docs/api/util/pug.md)
- [ ] [request](./docs/api/util/request.md)
- [ ] [watcher](./docs/api/util/watcher.md)

## todo
- [ ] deploy_scripts 和 crontab 使用文件软连接

## 安装

>最好在安装前申请好 appcode ，因为 appcode 会写入到某些文件中，后续手动修改可能会出现遗漏，可能影响发布。

使用 `npx` 启动创建新项目的手脚架工具：

```
npx create-nice-node
```

- 忽略文件：在系统上提交，可以忽略整个文件。
- 忽略分支：在系统上申请，可以在发布时忽略某个分支。

eslint 可以通过以下方式触发：
- git commit 前会触发本地 lint-staged 对修改的文件检查。
- git push 后会触发服务器对当前分支上增量代码检查。
- 本地手动执行 `npm run lint` 对 src 下所有文件检查。
- 本地手动执行 `npm run lint:fix` 对 src 下所有文件检查并修复。


## typescript
内置 `typescript@^3.7.5`， 支持可选链操作。

### tsconfig.json
nice-node 内置了一份 tsconfig.json

```json
// nice-node 内置的 tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "declaration": true,
    "removeComments": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es2017",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./src",
    "allowSyntheticDefaultImports": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

建议项目中的 tsconfig.json 从 nice-node 内置的文件中继承，由于配置中的路径都是相对于原始 json 文件的，所以继承后需要重新覆盖所有和路径相关的参数，其他参数也可以根据实际情况覆盖或者新增。

```json
// 使用继承和覆盖的 tsconfig.json
{
  "extends": "./node_modules/nice-node/tsconfig.json",
  "compilerOptions": {
    "declaration": false,
    "sourceMap": false,
    "outDir": "./dist",
    "baseUrl": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## access log
记录访问日志。

相关配置参数
```
# 访问日志文件名格式
ACCESS_LOG_FILENAME=access.%DATE%.log
# 访问日志文件名中的日期格式
ACCESS_LOG_FILENAME_DATEFORMAT=YYYY-MM-DD-HH
# 访问日志文件切分频率
ACCESS_LOG_FREQUENCY=daily
# 访问日志格式
ACCESS_LOG_FORMAT=:remote-addr - [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":referrer" ":user-agent"
# 不记录访问日志的请求地址
ACCESS_LOG_SKIP_ENDPOINTS=/healthcheck.html,/favicon.ico
# 访问日志中时间格式
ACCESS_LOG_DATEFORMAT=yyyy-MM-dd HH:mm:ss
```

## logger
日志模块。

相关配置参数：
```
# 日志等级[debug/verbose/info/warn/error]
LOG_LEVEL=info
# 日志文件保存的相对目录
LOG_ROOT=../logs
# 日志文件名中的日期格式
LOG_FILE_DATE_PATTERN=YYYY-MM-DD-HH
# 日志文件是否压缩
LOG_FILE_ZIPPED_ARCHIVE=true
# 日志记录中时间格式
LOG_DATEFORMAT=yyyy-MM-dd HH:mm:ss
```

## watcher
监控打点模块。

相关配置参数：
```
# 是否启用 watcher
WATCHER_ENABLE=false
# 服务器地址
WATCHER_HOST=
# 指标前缀
WATCHER_PREFIX=
```

## pm2
pm2 模块。

相关配置参数：
```
# PM2 启动模式 [fork/cluster]
PM2_EXEC_MODE=cluster
# PM2 启动服务进程的数量
PM2_INSTANCES=0
```

## assets
静态文件服务器模块。

相关配置参数：
```
# 是否启用静态资源服务器
STATIC_ENABLE=false
# 静态文件根目录，多个目录用逗号连接
STATIC_ROOR=assets
```

## routes
自动加载路由文件目录。

相关配置参数：
```
# 是否启用路由文件自动加载功能
REQUIRE_ALL_ROUTES_ENABLE=true
# 路由文件存放目录
REQUIRE_ALL_ROUTES_ROOR=dist/routes
# 路由文件匹配(正则)规则
REQUIRE_ALL_ROUTES_PATTERN=^([^.].*).js(x)?$
```

## pug
Pug 模版模块。

相关配置参数：
```
# 是否启用 pug
PUG_ENABLE=false
# 模版根目录
PUG_BASEDIR=templates
# 模版view文件目录
PUG_VIEWPATH=templates/pages
```

需要安装以下依赖包：
```
npm i koa-pug
```

## graphql
GraphQL 模块。

相关配置参数：
```
# 是否启用 graphql
GRAPHQL_ENABLE=false
# graphql 地址
GRAPHQL_ENDPOINT=/graphql
# graphql scheme 文件匹配格式
GRAPHQL_TYPEDEFS_PATTERN=${src}/graphql/**/*.graphql
# graphql resolver 文件匹配格式
GRAPHQL_RESOLVERS_PATTERN=${src}/graphql/**/resolver.${ext}
```

需要安装以下依赖包：
```
npm i graphql graphql-tools graphql-type-json koa-graphql-fix merge-graphql-schemas
```

## 发布
nice-node 对发布过程的一些通用功能做了封装。

### check urls
发布系统通过访问目标机器上的某些地址的返回结果来判断目标机器是否具备对外提供服务的能力。

nice-node 内置了 check urls 路由，路由地址是 `/check_urls` 。

相关配置参数
```
# check url 地址
CHECK_URLS_ENDPOINT=/check_urls
```

### health check
Nginx 会根据访问目标机器上的 `/healthcheck.html` 的返回结果来判断目前机器是否对外提供服务。

发布系统在发布过程会对机器做下线和上线操作，所谓的下线其实就是把项目根目录下的 `healthcheck.html` 删除，反之，上线就是在项目目录下创建 `healthcheck.html` 。

nice-node 提供了将 `healthcheck.html` 转换成外网访问域名 `/healthcheck.html` 的功能。

相关配置参数
```
# health check 地址
HEALTH_CHECK_ENDPOINT=/healthcheck.html
```

### deploy_scripts
`/deploy_scripts` 目录下存放发布过程需要的启停服务脚本。文件名称需要配置到 portal 。

为了减少开发和调试的时间，nice-node 封装了启停服务的通用脚本，使用方式如下：
```
#! /bin/bash

# 这里需要传 appcode
APP_CODE="xxx"

source "/home/q/www/${APP_CODE}/webapps/node_modules/nice-node/scripts/start.sh"
# source "/home/q/www/${APP_CODE}/webapps/node_modules/nice-node/scripts/stop.sh"
```

### 定时任务同步机制
我们常会在服务器上设置定时任务，如清理过期的日志。配置定时任务需要登录到每一台服务器上手动配置，这种工作重复机械，还容易出错。为了避免这个问题，nice-node 设计了一种 crontab 同步机制，只需要在 `crontab/crontab.txt` 按 crontab 设置好定时任务即可，发布时这些定时任务会同步到服务器。

```
# 每天凌晨5点删除过期的日志文件
0 5 * * * sh /home/q/www/h_special_distribution_node/webapps/crontab/deleteLogs.sh 1>/dev/null
```

### 前后端关联
如需关联前端项目，需要检查 `pom.xml` 设置，确保包含 <%=appname%> 的参数都配置正确。

### .syncignore
项目编译成功后，编译系统默认会将编译目录下所有文件和目录都同步到目标服务器上，有些文件（如*.ts）在程序运行时不需要，没有必要把这些文件部署到目标服务器，减少部署的文件数量能减少发布时间。Portal 上有个 `部署时需排除文件(excludes) ` 参数，目的就是排除不需要部署的文件，但这个功能有bug，比如配置了 `src` ，那么所有路径中包含 src 关键字的文件都会被忽略，包括 `node_module/debug/src/index.js` 这种文件，这和我们期望的不一致。因此 nice-node 将这个功能集成在编译命令 `nice-node build` ，编译成功后，nice-node 会根据项目根目录下的 `.syncignore` 删除相关的文件。如果项目根目录下没有 `.syncignore` ，则会使用 nice-node 默认的 `.syncignore` ，默认的 `.syncignore` 内容如下：

```
.vscode
.editconfig
.eslintignore
.eslintrc
.gitignore
nodemon.json
package-lock.json
pom.xml
tsconfig.json

# 日志目录
logs

# 源代码目录
src
```

#### .syncignore 格式
- 每行一个文件或目录
- 使用相对 `process.cwd()` 的相对路径
- 井号(#)开头的行被视为注释
- 忽略空行
- （暂时）不支持通配符

### 发布参数设置
以下是在新建发布任务时需要配置的参数，没有提到的参数不用修复，使用默认值即可。
- 基础信息
  - 应用类型：`node`
- 编译参数
  - 分支策略(branch_strategy) `分支发布`
  - 编译方法(compile_method) `node`
  - node_version `12.x`
  - 编译自定义命令(compile_command) `npm run build`
- 部署参数
  - 部署源路径(target_dir) `./`
  - 部署目标路径(deploy_dst) `/home/q/www/${appcode}/webapps`
  - 服务心跳检测路径(healthcheck_root) `/home/q/www/${appcode}/webapps`
  - 应用端口(app_port) `7001`
  - 服务启动检测地址(check_urls) `/check_urls`
  - 启服务脚本(start_websrv_scripts) `${appcode}_start`
  - 停服务脚本(stop_websrv_scripts) `${appcode}_stop`