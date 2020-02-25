# Nice node

这是一个 `koa2` + `typescript` 的 node 迷你框架。

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
- [ ] ssr
- [x] 自动加载路由功能（可选）
- [x] 支持 GraphQL（可选）
- [x] 可配置的代理转发（可选）
- [x] 集成 portal 发布
  - deploy_scripts
  - 定时任务同步机制
  - 代码覆盖率
- [ ] qconfig
- [ ] 兼容 windows 系统
- nicenode.env 参数检查
- deploy_scripts crontab 进一步封装
- .syncignore
- 找 cm 将发布参数设置打包成nice-node类型，内置到portal系统
- koa-static 封装成中间件有问题
- requireAllRoutes 封装成中间件
- [ ] unit test

## todo
- [ ] deploy_scripts 和 crontab 使用文件软连接

## lerna 带来的问题
- 在 vscode 中 eslint 失效
- 无法使用 standard-version

## 安装

>最好在安装前申请好 appcode ，因为 appcode 会写入到某些文件中，后续手动修改可能会出现遗漏，可能影响发布。

使用 `npx` 启动创建新项目的手脚架工具：

```
npx create-nice-node
```

工具会先下载依赖包，然后会出现创建新项目的问答界面，根据实际情况输入或选择答案后，工具会自动完成：
1. 创建新项目代码。
2. 自动运行 `npm install` 安装依赖文件。

此时，进入刚创建的项目目录，运行 `npm start` 就可以将项目运行起来。

## 新项目目录结构
进入刚创建的项目目录，我们一起看看目录结构：

```
.
├── /.vscode/             # vscode配置
│   └── /settings.json
├── /crontab/             # crontab相关文件存放目录
│   ├── /crontab.txt        # crontab配置
│   └── /deleteLogs.sh      # 日志清理脚本
├── /deploy_scripts/      # portal发布过程需要的脚本
│   ├── /${appCode}_start   # 启服务脚本
│   └── /${appCode}_stop    # 停服务脚本
├── /profiles/            # 不同环境的配置文件
│   ├── /local              # 本地环境
│   │   ├── /nicenode.env     # nicenode框架配置（覆盖默认配置）
│   │   └── /request.env      # 请求地址配置（可自定义）
│   ├── /beta               # 测试环境
│   └── /prod               # 线上环境
├── /src/                 # 源代码
│   ├── /graphql/           # graphql（选择graphql后会生成）
│   ├── /routes/            # 路由文件目录
│   └── /index.ts
├── /templates/           # 模版（选择pug后会生成）
│   ├── /layout/            # 布局文件
│   └── /pages/             # 页面文件
├── .eslintrc.js          # eslint配置文件
├── .npmrc                # npm配置文件，可以改成公司内部源
├── ecosystem.config.js   # PM2配置文件
├── nodemon-debug.json    # nodemon-debug配置文件
├── nodemon.json          # nodemon配置文件
├── pom.xml               # maven配置文件，用作前后端项目关联（选择pug后会生成）
└── tsconfig.json         # typescript配置文件
```

## 内置命令
在 `package.json` 的 `scripts` 中内置了以下命令：
- `start`
    启动开发环境
- `build`
    编译项目
- `start:prod`
    预览编译后的项目
- `lint`
    查看 lint 结果
- `lint:fix`
    查看 lint 结果并尝试修复

## 配置文件
nice-node 使用 [dotenv](https://www.npmjs.com/package/dotenv) 进行配置管理。

- 井号(#)开头的行被视为注释
- 忽略空行
- 格式： `key=value`
- key命名规范：大写字母 + 下划线(_)
- 空值会转换为空字符串: `EMPTY=` => `{EMPTY: ''}`
- 值前后空格会去掉，不希望被去掉的话，对值前后加引号

所有配置都会挂到 `process.env` 上，由于 `process` 是全局的，所以，在所有代码中都能很方便的获取到配置参数。需要注意的是，由于配置挂载到 `process.env` 这个动作是在 nice-node 内部完成的，所以项目中务必在加载 nice-node 后再使用配置。

```js
import NiceNode from 'nice-node';
// 这之后的 process.env 上才能取到配置参数
```

项目根目录（注意不是 `src` 目录）的 `profiles` 目录是存放配置文件的目录，在 `profiles` 目录下分别为不同环境建立 profile 文件，`${PROFILE}/*.env` 为区分环境的配置文件, ${PROFILE} 会先从环境变量 `PROFILE` 中取值，取不到会再从 `NODE_ENV` 中取，如果也取不到，则会抛出异常。

### 配置加载规则
项目的启动过程会加载多个配置文件，配置文件加载顺序是：

1. 命令行中传入的环境变量。
2. profiles 下对应 profile 目录下的配置文件。
3. node_modules/nice-node/nicenode.env 配置文件。

当配置中存在重复的 key 时，以先加载的 key 为准。

### 注意
从 `process.env` 中取到的值 **都是字符串**，在代码中做判断时一定要用字符串比较。

```js
const { WATCHER_ENABLE } = process.env;

// 这里一定要用字符串比较
if (WATCHER_ENABLE === 'true') {}
```

### 配置文件的选择
- nicenode.env
  新建的 nice-node 项目默认包含 `profiles/${profile}/nicenode.env` ，该文件中的参数只能是 nice-node 框架[内置的配置参数](https://github.com/zhongzhi107/nice-node/blob/master/packages/nice-node/nicenode.env)，多余的参数会导致启动程序出错。

- 其他 .env 文件
  `profiles/${profile}/**/*.env` 都会加载到环境变量中，因此在目录下可以根据实际需要随意创建 .env 文件和目录。推荐：
    - app.env 和业务相关的配置
    - request.env 和外部请求接口相关的配置
    - ...

- src/config.js
  业务相关的配置，和 .env 不一样的是，`src/config.js` 里的配置参数是无环境差异的，如果参数在不同环境需要不同的值，那么这个参数需要提取到 .env 中。


## eslint
nice-node 内置了 eslint，使用的规则是 `eslint-config-qunar-typescript-node` 。

本地的 eslint 规则可以通过 `.eslintrc.js` 来修改。但代码提交时会在服务器端校验，当出现错误时会导致编译发布失败。另外，还有2种方式可以忽略规则：
- 忽略规则：用 `// eslint-disable-line` 和 `// eslint-disable-next-line` 来忽略单行，后面必须指明具体规则名称
    ```js
    console.log(a); // eslint-disable-line no-undef

    // eslint-disable-next-line no-undef
    console.log(a);

    // eslint-disable-line no-undef,semi
    console.log(a)
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

## 对已有中间件进行二次封装
参考 [middlewares/body-parser](https://github.com/zhongzhi107/nice-node/blob/master/packages/nice-node/src/middlewares/body-parser.ts)