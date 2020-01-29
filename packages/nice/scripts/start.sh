#! /bin/bash

####
# 启动 PM2 服务
#
# 当脚本由 jenkins 发布命令调起时，会传入环境变量 deploy_type (发布类型，可选值：dev|beta|prepare|prod)
# 当手动执行时通过机器名来判断环境类型（可能由bug）
####

set -eu

# 查看所有环境变量
env

# APP_CODE="h_pc_ssr"
APP_PATH="/home/q/www/${APP_CODE}"
APP_WEBAPPS_PATH="${APP_PATH}/webapps"

# 从 .env 中获取 app code
# source "${APP_WEBAPPS_PATH}/profiles/default/system.env"
# echo ${APP_CODE}

# 进入工作目录
# cd ${deploy_dst}
cd ${APP_WEBAPPS_PATH}

echo "Starting ${APP_CODE}"

# 启动当前目录的 ecosystem.config.js
pm2 start --name ${APP_CODE} || exit 1

echo "Start server done"

# 服务器 crontab 配置文件
CRONTAB_REMOTE_PATH="/var/spool/cron/root"
# 本地 crontab 配置文件
CRONTAB_LOCAL_PATH="${APP_WEBAPPS_PATH}/crontab/crontab.txt"

if [ -f "${CRONTAB_LOCAL_PATH}" ]; then
  echo "${CRONTAB_LOCAL_PATH} found."
  cat ${CRONTAB_LOCAL_PATH}

  # 注意：这里会删除所有包含 appcode 的 crontab
  echo "Start to delete crontabs."
  sed -i "/${APP_CODE}/d" ${CRONTAB_REMOTE_PATH}
  echo "Crontabs have been deleted."

  # 添加新任务
  echo "Start to add crontabs from ${CRONTAB_LOCAL_PATH}."
  (cat ${CRONTAB_LOCAL_PATH};echo) | while read line
  do
    echo "${line}"
    if [[ "${line}" =~ (^#) ]] || [[ "${line}" = "" ]]; then
      # 忽略注释和空行
      echo "ignore comments and blank lines."
    else
      echo "${line}" >> ${CRONTAB_REMOTE_PATH}
      echo "done."
    fi
  done

  echo "Crontabs updated successfully."
else
  echo "${CRONTAB_LOCAL_PATH} not found, skipping crontab update."
fi
