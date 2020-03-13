---
id: deploy
title: 部署项目
---

## 在服务器上安装 node 和 pm2
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
Linux `crontab` 是用来定期执行程序的命令。当安装完成操作系统之后，默认便会启动此任务调度命令。crond 命令每分钟会定期检查是否有要执行的工作，如果有要执行的工作便会自动执行该工作。

我们经常会用到 crontab ，如日志文件定期清理、定时执行数据抓取任务等。通常配置 crontab 任务需要远程登录到服务器，这个过程比较浪费时间，而且当服务器集群过大时，如何保证所有服务器配置一致也是个问题。对于这个问题，nice-node 的解决方式是 `本地编辑、远程同步` ，就是在本地编辑 crontab 任务列表，发布时同步到服务器，这样操作起来简单方便，而且能保证多服务器上配置完全一致，具体做法是：
1. 在项目根目录新建 `crontab` 目录和 `crontab/crontab.txt` 文件
1. 按着标准的 linux crontab 任务配置方式在 `crontab/crontab.txt` 中创建任务，如
    ```sh
    # 每天凌晨5点删除过期的日志文件
    0 5 * * * sh /some-where/your-script.sh 1>/dev/null

    ```
Nice-node 发布时会根据 `appCode` 先清除已有的 crontab 任务（执行脚本的路径中能模糊匹配到 appCode 的任务），然后再将 `crontab/crontab.txt` 中配置的任务添加服务器的系统任务列表。

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

## 相关链接
- [Linux crontab](https://www.runoob.com/linux/linux-comm-crontab.html)
- [Maven pom.xml](http://maven.apache.org/pom.html)