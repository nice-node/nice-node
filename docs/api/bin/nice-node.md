---
id: bin-nice-node
title: nice-node
---

Nice-node 提供了一个命令行工具，它位于 `node_modules/.bin/nice-node` ，目前支持的命令有：

#### build
编译项目。编译命令会完成以下几件事情：
1. 生成包含 `PRFOLE` 和 `NODE_ENV` 的 `.env` 文件。
1. 删除已有的 `dist` 目录。
1. 调用 `tsc` 将 `src/**/*.tsx` 编译输出到 `dist/**/*.js`。
1. 根据 `.syncignore` 配置删除无用的文件。

