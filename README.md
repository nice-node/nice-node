# Nice Node

## Status

[![npm version](https://badge.fury.io/js/nice-node.svg)](https://badge.fury.io/js/nice-node)
[![Build Status](https://travis-ci.com/nice-node/nice-node.svg?branch=master)](https://travis-ci.com/nice-node/nice-node)
[![Coverage Status](https://coveralls.io/repos/github/qails/qails/badge.svg?branch=master)](https://coveralls.io/github/qails/qails?branch=master)
[![Dependency Status](https://david-dm.org/nice-node/nice-node.svg)](https://david-dm.org/nice-node/nice-node)

## 安装

>最好在安装前申请好 appcode ，因为 appcode 会写入到某些文件中，后续手动修改可能会出现遗漏，可能影响发布。

使用 `npx` 启动创建新项目的手脚架工具：

```
npx create-nice-node
```

## 命令
### 启动本地服务
    ```sh
    npm start
    ```
### 编译工程
    ```sh
    # 编译
    npm run build

    # 编译并预览编译结果
    npm run start:prod
    ```
### 代码检查
    ```sh
    # 检查并返回错误结果
    npm run lint
    # 检查并尝试修复
    npm run lint:fix
    ```
### 测试
    ```sh
    npm test

    # 查看代码覆盖率
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
- [x] 可配置的代理转发
- [x] 支持静态文件服务（可选）
- [x] 支持 pug 模版（可选）
- [x] 自动加载路由功能（可选）
- [x] 支持 GraphQL（可选）
- [x] .syncignore
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
- 内置 `typescript@^3.7.5`， 支持可选链操作
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

