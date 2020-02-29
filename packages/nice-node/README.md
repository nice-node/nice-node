# Nice Node

## Status

[![npm version](https://badge.fury.io/js/nice-node.svg)](https://badge.fury.io/js/nice-node)
[![Build Status](https://travis-ci.com/zhongzhi107/nice-node.svg?branch=master)](https://travis-ci.com/zhongzhi107/nice-node)
[![Coverage Status](https://coveralls.io/repos/github/qails/qails/badge.svg?branch=master)](https://coveralls.io/github/qails/qails?branch=master)
[![Dependency Status](https://david-dm.org/zhongzhi107/nice-node.svg)](https://david-dm.org/zhongzhi107/nice-node)



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

## todo
- [ ] mocha 删不掉目录
