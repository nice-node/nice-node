/**
 * 区分 profiles 的日志输出模块
 * 日志按日期自动切分、gzip
 * 日志文件输出目录为根目录下的 logs
 *
 * 开发环境在控制台上输出日志，日志带颜色，日志等级为 debug
 * 线上环境在控制台上不输出日志，日志不带颜色，日志等级为 info
 *
 * 各环境的日志等级可以在 profiles 的 LOG_LEVEL 变量配置，
 * 可选值为 [debug,verbose,info,warn,error]
 *
 * @examples
 * import logger from 'utils/logger';
 * logger.debug('xx'); // <- 仅开发环境输出日志
 * logger.verbose('xx'); // <- 仅开发环境输出日志
 * logger.info('xx'); // <- 所有环境都输出日志
 * logger.warn('xx'); // <- 所有环境都输出日志
 * logger.error('xx'); // <- 所有环境都输出日志
 */

import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { Format } from 'logform';
import { format as dateFormat } from 'date-fns';
import { isObject } from 'util';

const {
  combine,
  timestamp,
  printf
} = format;

const {
  PROFILE,
  LOG_LEVEL,
  LOG_ROOT,
  LOG_FILE_DATE_PATTERN,
  LOG_FILE_ZIPPED_ARCHIVE,
  LOG_DATEFORMAT
} = process.env;

const isLocal = PROFILE === 'local';

const rotateOptions = {
  dirname: LOG_ROOT,
  datePattern: LOG_FILE_DATE_PATTERN,
  zippedArchive: LOG_FILE_ZIPPED_ARCHIVE === 'true'
};

const combinedTransport = new DailyRotateFile({
  filename: 'combined.%DATE%.log',
  ...rotateOptions
});

const errorTransport = new DailyRotateFile({
  filename: 'error.%DATE%.log',
  level: 'error',
  ...rotateOptions
});

const formatter = printf(({ level, message, timestamp: time }) => {
  /* istanbul ignore next */
  if (isObject(message)) {
    message = JSON.stringify(message);
  }
  const localeDateString = dateFormat(new Date(time), LOG_DATEFORMAT);
  return `${localeDateString} ${level}: ${message}`;
});

const features: Format[] = [timestamp(), formatter];
const logger: any = createLogger({
  level: LOG_LEVEL,
  format: combine(...features),
  transports: [combinedTransport, errorTransport]
});

/* istanbul ignore next */
if (isLocal) {
  // 本地开发时在控制台输出日志
  logger.add(new transports.Console());
}

export default logger;
