---
id: pm2
title: PM2 管理多个网站
---

在工作中可能会有将多个网站部署到同一台服务器这种情况，在这种情况下，如何管理好各网站能顺利的协同工作、不相互影响？ PM2 具备管理多个网站的能力。

## pm2 startup
服务器宕机和重启是避免不了的事情，重启后网站要恢复正常工作，这是保证网站稳定性的必要手段。`pm2 startup` 会将 PM2 加载到系统的启动程序中，它会根据不同的操作系统使用不同的方法来添加 PM2 启动程序。目前支持的操作系统有：
- systemd: Ubuntu >= 16, CentOS >= 7, Arch, Debian >= 7
- upstart: Ubuntu <= 14
- launchd: Darwin, MacOSx
- openrc: Gentoo Linux, Arch Linux
- rcd: FreeBSD
- systemv: Centos 6, Amazon Linux

在命令行中输入以下命令，就能得到自动启动程序的执行脚本。
```sh
# Detect available init system, generate configuration and enable startup system
pm2 startup
```
执行时不要使用 `sudo` 权限，该命令执行的返回结果会指导你下一步怎么做，一定要仔细看控制台中的提示文案。

通过实践发现，在 `CentOS >= 7` 操作系统上，用 `sudo` 执行命令一次就能成功。
```
sudo pm2 startup
```
执行成功的话会看到类似以下的信息：
```
[PM2] Init System found: systemd
Platform systemd
Template
[Unit]
Description=PM2 process manager
Documentation=https://pm2.keymetrics.io/
After=network.target

[Service]
Type=forking
User=root
LimitNOFILE=infinity
LimitNPROC=infinity
LimitCORE=infinity
Environment=PATH=/home/q/node-v12.13.1/bin:/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
Environment=PM2_HOME=/root/.pm2
PIDFile=/root/.pm2/pm2.pid

ExecStart=/home/q/nodejs/lib/node_modules/pm2/bin/pm2 resurrect
ExecReload=/home/q/nodejs/lib/node_modules/pm2/bin/pm2 reload all
ExecStop=/home/q/nodejs/lib/node_modules/pm2/bin/pm2 kill

[Install]
WantedBy=multi-user.target

Target path
/etc/systemd/system/pm2-root.service
Command list
[ 'systemctl enable pm2-root' ]
[PM2] Writing init configuration in /etc/systemd/system/pm2-root.service
[PM2] Making script booting at startup...
[PM2] [-] Executing: systemctl enable pm2-root...
Created symlink from /etc/systemd/system/multi-user.target.wants/pm2-root.service to /etc/systemd/system/pm2-root.service.
[PM2] [v] Command successfully executed.
+---------------------------------------+
[PM2] Freeze a process list on reboot via:
$ pm2 save

[PM2] Remove init script via:
$ pm2 unstartup systemd
```

## pm2 save
现在重启服务器试一下，看看效果，不出意外的话，你发现 PM2 已经能开机后自启动了，但用 `sudo pm2 list` 网站列表会发现，PM2 并没有启动任何网站！！！是哪里出了问题呢？原因是 `pm2 startup` 只是把 PM2 添加到了自启动程序，PM2 要启动哪些网站，它并不知道。怎么办？这下轮到 `pm2 save` 出场了。

`pm2 save` 会保存 PM2 当前所有网站进程，也就是 `pm2 list` 列出的所有进程。来运行看看：

```
sudo pm2 list
```
执行成功会看到下面的提示信息：
```
[PM2] Saving current process list...
[PM2] Successfully saved in /root/.pm2/dump.pm2
```
如果你仔细观察了的话，会发现一个地址 `/root/.pm2/dump.pm2` ，这个就是进程信息存档文件的地址，打开看一下，基本上和 `ecosystem.config.js` 差不多，里面记录所有进程的信息。
```
[
  {
    "kill_retry_time": 100,
    "windowsHide": true,
    "username": "root",
    "treekill": true,
    "automation": true,
    "pmx": true,
    "instance_var": "NODE_APP_INSTANCE",
    "exec_mode": "cluster_mode",
    "autorestart": true,
    "vizion": true,
    "merge_logs": true,
    "env": {
      "PM2_JSON_PROCESSING": "true",
      "PM2_USAGE": "CLI",
      "_": "/bin/pm2",
      "OLDPWD": "/",
      "SYSTEMCTL_IGNORE_DEPENDENCIES": "",
      "SHLVL": "1",
      "HOME": "/root",
      "ROOT": "/home/xxx/my_website/",
      "PWD": "/home/xxx/my_website",
      "PATH": "/usr/local/bin:/sbin:/usr/sbin:/bin:/usr/bin",
      "SYSTEMCTL_SKIP_REDIRECT": "",
      "TERM": "unknown",
      "PM2_HOME": "/root/.pm2",
      "my_website": "{}",
      "unique_id": "afd28c2b-3b33-42d6-b888-d11fe0fc2675"
    },
    "time": true,
    "log_date_format": "YYYY-MM-DDTHH:mm:ss",
    "name": "my_website",
    "node_args": [],
    "pm_exec_path": "/home/xxx/my_website/dist/server.js",
    "pm_cwd": "/home/xxx/my_website",
    "exec_interpreter": "node",
    "pm_out_log_path": "/home/xxx/my_website/combinded.log",
    "pm_err_log_path": "/home/xxx/my_website/combinded.log",
    "pm_pid_path": "/root/.pm2/pids/h-touch-search-cn-0.pid",
    "km_link": false,
    "vizion_running": false,
    "NODE_APP_INSTANCE": 0,
    "PM2_JSON_PROCESSING": "true",
    "PM2_USAGE": "CLI",
    "_": "/bin/pm2",
    "OLDPWD": "/",
    "SYSTEMCTL_IGNORE_DEPENDENCIES": "",
    "SHLVL": "1",
    "HOME": "/root",
    "ROOT": "/home/xxx/my_website/",
    "PWD": "/home/xxx/my_website",
    "PATH": "/usr/local/bin:/sbin:/usr/sbin:/bin:/usr/bin",
    "SYSTEMCTL_SKIP_REDIRECT": "",
    "TERM": "unknown",
    "PM2_HOME": "/root/.pm2",
    "my_website": "{}",
    "unique_id": "afd28c2b-3b33-42d6-b888-d11fe0fc2675",
    "status": "online",
    "pm_uptime": 1582704649245,
    "axm_actions": [],
    "axm_monitor": {
      "Event Loop Latency": {
        "unit": "ms",
        "type": "internal/libuv/latency",
        "historic": true,
        "agg_type": "avg",
        "value": "0.68ms"
      },
      "Active handles": {
        "type": "internal/libuv/handles",
        "historic": true,
        "agg_type": "avg",
        "value": 1
      }
    },
    "axm_options": {
      "error": true,
      "metrics": {
        "transaction": {
          "http": false,
          "tracing": false
        },
        "v8": false,
        "deepMetrics": false
      },
      "actions": {
        "profilingHeap": false,
        "profilingCpu": false,
        "eventLoopDump": false
      },
      "module_conf": {},
      "pmx_version": "2.4.7",
      "module_name": "my_website",
      "module_version": "3.2.8"
    },
    "axm_dynamic": {},
    "created_at": 1582704649245,
    "restart_time": 0,
    "unstable_restarts": 0,
    "_pm2_version": "3.2.8",
    "version": "1.0.0",
    "versioning": null,
    "node_version": "12.13.1"
  },
  // ...
]
```
有了这份存档，PM2 就能轻而易举的恢复网站了。再试试重启服务器，这次你会看到不但 PM2 启动了，而且所有网站服务都恢复了。

## pm2 unstartup
最后说一下 `pm2 unstartup` ，看名字就很好理解，它是把 PM2 从自启动程序中移除的命令。运行 `pm2 unstartup` 看看会发生什么：
```
[PM2] Init System found: systemd
Removed symlink /etc/systemd/system/multi-user.target.wants/pm2-root.service.

Removed symlink /etc/systemd/system/multi-user.target.wants/pm2-root.service.

[PM2] Init file disabled.
```
成功的移除了。

## pm2 resurrect
根据存档信息，手动恢复 `pm2 save` 时的网站服务。

## pm2 delete 和 pm2 kill 的区别
- `pm2 delete` 删除网站进程，再次启动时，会网站代码重新加载，但 **`ecosystem.config.js` 不会重新加载** ，因此如果是改了 `ecosystem.config.js` ，那用 `pm2 delete` 删除网站再重启是不会生效的。
- `pm2 kill` 退出 PM2 。再次启动时，网站代码和 `ecosystem.config.js` 都会重新加载。


## 总结
所以，正确的使用姿势是：
- 在服务器安装 PM2 时就执行 `pm2 startup`，将 PM2 添加到系统自启动程序中。
- 在网站服务正常启动后，执行 `pm2 save` 创建存档。
- 网站服务发生变更时，再次执行 `pm2 save` 更新存档。
