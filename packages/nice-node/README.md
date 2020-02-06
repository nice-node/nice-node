# aa

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

## features
- [x] check urls
- [x] health check
- [x] watcher
- [x] access log
- [x] request log
- [x] crontab
- [x] import resolver
- [ ] remove debug-filename
- [ ] graphql
- [ ] qconfig
- [ ] redis
