---
id: create
title: 创建新项目
---

Node 的使用越来越普及，前端工程师越来越多的接触服务器编程，服务器编程是一个和传统前端工作差别非常大的工作，需要前端转变思维方式，对程序关注的重点也和以往的工作有了不同，这个转变对大多数没有服务器端开发经验的前端来说是个比较难的过程。`Nice-node` 针对服务器端编程中的一些通用功能做了一层封装，让前端开发 node 项目变得容易上手。

对于 node 新手来说，从零开始搭建一个项目是一件不简单的事情，但新建一个 nice-node 工程却非常简单，只需要执行一个 `npx` 命令即可：

>npx 是 npm 从 5.2 版本开始增加的命令，它能远程调用 npm 包并执行。如果你机器上的 npm 版本低于 5.2 ，则需要手动安装 npx
>```
>npm install -g npx
>```
>
>Nidce-node 要求 node 版本 8.0 以上。

```
npx create-nice-node
```
如果程序运行正常的话，你会看到正在下载文件，稍等一会，待文件下载完毕就会出现一系列如下的交互式问答(假设需要创建一个名称为 `my_project` 的项目)：
```
? What is the project name? my_project
? What is the app code? my_project
? Use graphql? (y/N) No
? Use pug template? (y/N) No
? Use qconfig? (y/N) No
```

根据项目的实际情况回答问题，安装程序会根据你回答的情况创建新项目，同时会安装项目需要的依赖包：

```
Creating my_project...

> Success! Created files for my_project

  Installing npm modules:
    nice-node
```

稍等，依赖包安装完毕，你会看到成功界面：
```
> Success! Installed dependencies for my_project

  Awesome! You're now ready to start coding.

  I already ran npm install for you, so your next steps are:
    cd my_project

  To start a local server for development:
    npm start

  To build a version for production:
    npm run build

  To run the server in production:
    npm run start:prod

  Questions? Feedback? Please let me know!
  https://github.com/zhongzhi107/nice-node/issues
  ```
恭喜你，第一个 nice-node 项目初始化完成了！

进入 my_project 目录并启动项目：
```
cd my_project
npm start
```

如果启动成功的话，你会看到 `🚀 http://localhost:3000` 。在浏览器中访问 `http://localhost:3000`，就能看到 Hello world 页面了。

## 目录结构

现在回过头来看看刚创建项目的目录结构：
```
.
├── /.vscode/             # vscode配置
│   └── /settings.json
├── /crontab/             # crontab相关文件存放目录
│   └── /crontab.txt        # crontab配置
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
目录和文件不少，在后续的文章中我们会逐一给大家介绍，这次我们只关注 [src/routes/index.ts](https://github.com/zhongzhi107/nice-node/blob/master/packages/create-nice-node/template/src/routes/index.ts) ，这个文件就是刚看到的 Hello world 对应的页面，可以修改 Hello world ，保存文件后，服务会自动重启，我们只需要刷新浏览器就能看到修改后的内容。

## 脚本
初始化项目包含一下几个命令，可以用 `npm run` 运行。

- **start**
  启动开发环境，启动端口默认为 `3000`。
- **build**
  编译项目，将 `src` 目录下所有 ts 编译成 js 输出到 `dist` 目录。
- **start:prod**
  预览编译后的项目。
- **lint**
  代码检查。
- **lint:fix**
  代码检查并自动修复问题代码。
