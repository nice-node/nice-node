#! /bin/bash

####
# 停止 PM2 服务
#
# 以下环境变量由 jenkins 传入：
# - app_code {string}
####

set -eu

echo "stop server ${APP_CODE}"
pm2 delete ${APP_CODE} || echo "${APP_CODE} not exist, skipped."
echo "stop server done"
