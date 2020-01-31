/**
 * 记录网站访问日志的中间件
 * 可以通过修改配置来实现以下自定义
 *   - 日志格式
 *   - 日志文件保存路径
 *   - 日志文件分割策略
 *
 * @param options {object}
 * @param options.format {string} 日志格式
 * @param options.root {string} 日志存放目录
 * @param options.filename {string} 日志文件名称
 * @param options.dateFormat {string} 日志文件名称中的日期格式，https://momentjs.com/docs/#/displaying/format/
 * @param options.frequency {string} 日志文件分割频率。取值为：['daily'(每天), 'custom'(自定义), 'test'(每分钟)]
 * @param options.verbose {boolean}
 *
 * @see
 * https://github.com/koa-modules/morgan
 * https://github.com/rogerc/file-stream-rotator
 */

import fs from 'fs';
import path from 'path';
import morgan from 'koa-morgan';
import FileStreamRotator from 'file-stream-rotator';
import { format as dateFnsFormat } from 'date-fns'

/**
 * @param {object} options
 * @param {string} options.format 日志文本格式
 * @param {string} options.root 日志文件保存路径
 * @param {string} options.filename 日志文件名格式
 * @param {string} options.dateFormat 日志文件名中日期格式
 * @see https://momentjs.com/docs/#/displaying/format/
 * @param {bool} options.verbose
 * @param {string} options.frequency 日志文件拆分频率（貌似直接用dateFormat就能控制）
 * How often to rotate
 * - daily: Rotate every day
 * - h: Rotate on the hour or any specified number of hours
 * - m: Rotate on given minutes using the 'm' option i.e. 5m or 30m
 * @see https://www.npmjs.com/package/file-stream-rotator
 */

interface AccessLogOptions {
  format?: string,
  root?: string,
  dateFormat?: string,
  skip?: any,
  filename?: string,
  frequency?: string,
  verbose?: boolean
}

export default (options: AccessLogOptions = {}) => {
  const {
    ACCESS_LOG_FORMAT,
    ACCESS_LOG_FILENAME,
    ACCESS_LOG_FILENAME_DATEFORMAT,
    ACCESS_LOG_FREQUENCY,
    ACCESS_LOG_SKIP_ENDPOINTS = '',
    ACCESS_LOG_DATEFORMAT,
    LOG_ROOT
  } = process.env;
  const {
    format = ACCESS_LOG_FORMAT,
    root = path.resolve(LOG_ROOT),
    filename = ACCESS_LOG_FILENAME,
    dateFormat = ACCESS_LOG_FILENAME_DATEFORMAT,
    frequency = ACCESS_LOG_FREQUENCY,
    skip = (req: any) => ACCESS_LOG_SKIP_ENDPOINTS.split(',').includes(req.baseUrl),
    verbose = false
  } = options;

  if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }

  // create a rotating write stream
  const stream = FileStreamRotator.getStream({
    date_format: dateFormat,
    filename: path.resolve(root, filename),
    frequency,
    verbose
  });

  morgan.token('remote-addr', (req) => {
    const [ip] = ((req.headers['x-forwarded-for'] || '') as string).split(',');
    return ip || req.socket.remoteAddress || undefined;
  });

  morgan.token('date', () => dateFnsFormat(new Date(), ACCESS_LOG_DATEFORMAT));

  return morgan(format, { stream, skip });
};
