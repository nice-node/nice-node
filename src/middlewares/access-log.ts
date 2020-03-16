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
import Koa from 'koa';
import morgan from 'koa-morgan';
import FileStreamRotator from 'file-stream-rotator';
import { format as dateFnsFormat } from 'date-fns';
import deepmerge from 'deepmerge';

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

interface MorganOption extends morgan.Options {
  /** 访问日志格式 */
  format?: string;
  /** 日志文件保存的相对目录 */
  root?: string;
  /** 记录中的时间格式 */
  timeStampFormat?: string;
  streamOptions?: {
    /** 日志文件名称 */
    filename?: string;
    /** 日志文件分割频率 */
    frequency?: string;
    /** 当切割文件或重命名文件时，日志是否输出在标准输出上 */
    verbose?: boolean;
    /** 日志文件名称中的日期格式 */
    date_format?: string; // eslint-disable-line camelcase
    size?: string;
    max_logs?: number; // eslint-disable-line camelcase
    audit_file?: string; // eslint-disable-line camelcase
    end_stream?: boolean; // eslint-disable-line camelcase
    file_options?: object; // eslint-disable-line camelcase
    utc?: boolean;
    extension?: string;
    watch_log?: boolean; // eslint-disable-line camelcase
    create_symlink?: boolean; // eslint-disable-line camelcase
    symlink_name?: string; // eslint-disable-line camelcase
  }
}

/** 访问日志中间件选项参数 */
export interface AccessLogMiddlewareOptions {
  /** 是否启用 */
  enable?: boolean;
  options?: MorganOption;
}

export default (opts: AccessLogMiddlewareOptions = {}) => {
  const {
    ACCESS_LOG_ENABLE,
    ACCESS_LOG_FORMAT,
    ACCESS_LOG_BUFFER,
    ACCESS_LOG_IMMEDIATE,
    ACCESS_LOG_SKIP_ENDPOINTS,
    ACCESS_LOG_TIME_STAMP_FORMAT,
    ACCESS_LOG_FILENAME,
    ACCESS_LOG_FILENAME_DATEFORMAT,
    ACCESS_LOG_FREQUENCY,
    ACCESS_LOG_VERBOSE,
    LOG_ROOT
  } = process.env;

  const defaultOptions: AccessLogMiddlewareOptions = {
    enable: ACCESS_LOG_ENABLE === 'true',
    options: {
      root: LOG_ROOT,
      format: ACCESS_LOG_FORMAT,
      buffer: ACCESS_LOG_BUFFER === 'true',
      immediate: ACCESS_LOG_IMMEDIATE === 'true',
      skip: (req: any) => ACCESS_LOG_SKIP_ENDPOINTS.split(',').includes(req.baseUrl),
      timeStampFormat: ACCESS_LOG_TIME_STAMP_FORMAT,
      streamOptions: {
        filename: ACCESS_LOG_FILENAME,
        frequency: ACCESS_LOG_FREQUENCY,
        date_format: ACCESS_LOG_FILENAME_DATEFORMAT,
        verbose: ACCESS_LOG_VERBOSE === 'true'
      }
    }
  };

  const {
    enable,
    options: {
      root,
      format,
      buffer,
      immediate,
      skip,
      timeStampFormat,
      streamOptions
    }
  } = deepmerge(defaultOptions, opts);

  if (enable) {
    const rootFullPath = path.resolve(root);
    if (!fs.existsSync(rootFullPath)) {
      fs.mkdirSync(rootFullPath);
    }

    // 修订 filename 为绝对路径
    streamOptions.filename = path.resolve(root, streamOptions.filename);
    // create a rotating write stream
    const stream = FileStreamRotator.getStream(streamOptions);

    morgan.token('remote-addr', (req) => {
      const [ip] = ((req.headers['x-forwarded-for'] || '') as string).split(',');
      /* istanbul ignore next */
      return ip || req.socket.remoteAddress || undefined;
    });

    morgan.token('date', () => dateFnsFormat(new Date(), timeStampFormat));

    return morgan(format, {
      buffer,
      immediate,
      skip,
      stream
    });
  }

  return async (ctx: Koa.Context, next: Koa.Next) => {
    await next();
  };
};
