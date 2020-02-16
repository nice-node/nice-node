#! /bin/bash

######################################
# 删除 logs 目录中 N 天（默认：7天）前的 *.gz 文件
#
# crontab:
# 每天凌晨 5 点 0 分时删除 7 天前的文件
# 0 5 * * * sh ${绝对路径}/crontabDeleteLogs.sh 1>/dev/null
# 每天凌晨 5 点 0 分时删除 3 天前的文件
# 0 5 * * * sh ${绝对路径}/crontabDeleteLogs.sh 3 1>/dev/null
#
# mtime 单位
# s  second
# m  minute (60 seconds)
# h  hour (60 minutes)
# d  day (24 hours)(默认值)
# w  week (7 days)
######################################

# 日志文件存放目录
LOG_ROOT="/home/q/www/${APP_CODE}/logs"

# 默认保留天数
BEFORE_DAYS=7

# 日志匹配格式
PATTERN="*.gz"

if [ ! -n "$1" ] ;then
  before=${BEFORE_DAYS}
else
  before=$1
fi

# gzip可能对当前服务器对外提供的服务有影响
# 随机数避免多台服务器同时执行gzip
SECOND=$(echo $RANDOM | cut -c1-3)
sleep $SECOND

# echo $before
find ${LOG_ROOT} -mtime +${before} -name ${PATTERN} | xargs sudo /bin/rm -rf

echo "delete logs completed."
