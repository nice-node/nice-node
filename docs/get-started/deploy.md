---
id: deploy
title: 部署项目
---

## node 和 pm2 部署
>确保账号拥有目标服务器的 `sudo` 权限，且远程登录过，否则会提示无权限或 ip 地址有问题。

使用 salt 脚本，在目标服务器上安装 node 和 pm2 。在 Portal 系统的应用树中选择 appcode 对应的节点，按着下面的步骤操作：
1. 选择【主机】
1. 勾选要部署的服务器
1. 选择【Salt部署】
1. 点击【执行命令】
1. 在弹框中输入下面的命令

```
sudo salt-call state.sls qunardev.hnode.nodejs_lts12 && sudo salt-call state.sls qunardev.hnode.pm2_v4
```
