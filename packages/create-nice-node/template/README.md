# <%= projectName%>

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
## 编码规范
- [Qunar JavaScript 规范](https://github.com/zhongzhi107/javascript/)
- [https://github.com/microsoft/TypeScript/wiki/Coding-guidelines](https://github.com/microsoft/TypeScript/wiki/Coding-guidelines)
- [https://github.com/Platypi/style_typescript](https://github.com/Platypi/style_typescript)

## 目录结构

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
├── pom.xml               # maven配置文件，用作前后端工程关联（选择pug后会生成）
└── tsconfig.json         # typescript配置文件
```
