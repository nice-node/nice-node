---
id: deploy
title: 部署项目
---

## node 和 pm2 部署
使用 salt 脚本，在目标服务器上安装 `node` 和 `pm2` 。

>确保账号拥有目标服务器的 `sudo` 权限，且远程登录过，否则会提示无权限或 ip 地址有问题。

在 Portal 系统的应用树中选择 appcode 对应的节点，按着下面的步骤操作：
1. 选择【主机】
1. 勾选要部署的服务器
1. 选择【Salt部署】
1. 点击【执行命令】
1. 在弹框中输入下面的命令

```sh
sudo salt-call state.sls qunardev.hnode.nodejs_lts12 && sudo salt-call state.sls qunardev.hnode.pm2_v4 && sudo pm2 startup
```

## 添加定时任务

## 排除不需要部署的文件
项目源代码都放在 `src` 目录下，发布时会编译到 `dist` ， `src` 下的文件没有必要发布到目标服务器。同理，像 `package-lock.json` 这种文件也不需要发布到目标服务器。

>注意：`pom.xml` 是用来做前端工程关联的，`maven` 同步前端资源是发生在目标服务器上，因此 `pom.xml` 必须发布到目标服务器。

Nice-node 内置了一个默认同步忽略文件列表，[点击查看](https://github.com/zhongzhi107/nice-node/blob/master/packages/nice-node/.syncignore) 。如果默认列表满足不了需要，你可以创建一个自定义的同步忽略文件列表，具体做法是：
1. 在项目根目录新建 `.syncignore` 文件。
1. 在 `.syncignore` 里列出需要忽略的文件或路径。
    - 每行一个文件或目录
    - 空行和井号开头的行（就是支持 `#` 单行注释）会忽略
    - 行首、行尾的空格会剔除
    - 路径是相对于项目根目录的，不支持模糊匹配，不支持部分匹配

我们来看一个示例：
```
###################################
# .syncignore
# 以下文件和目录将在编译执行成功后删除
# 避免同步到目标服务器
###################################

# 下面的规则只能匹配 /src
# 不能匹配 test/src
# 也不能匹配 /sr
src

# 不支持通配符，下面的指定是不合法的
# src/*.ts
```
