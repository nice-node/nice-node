#!/bin/bash
#
# 重启 /home/q/www 下所有的 node 应用
# 

ROOT=/home/q/www
ECOSYSTEM_CONFIG_JS="ecosystem.config.js"

pm2 kill

for i in `find ${ROOT} -maxdepth 2 \( -type d -o -type l \) -name webapps`;
do
  for i in `find -L ${i} -maxdepth 1 -type f \( -name ${ECOSYSTEM_CONFIG_JS} \)`;
  do
    cd `dirname ${i}`
    pm2 start ${i}
  done
done

pm2 save
