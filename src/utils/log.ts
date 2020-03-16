import npmlog, { log, LogLevels } from 'npmlog';

export default (level: LogLevels | string, message: string, ...args: any[]) => {
  const { PROFILE, NODE_ENV } = process.env;

  // 重写 npmlog 默认样式
  const prefix: string = '[nice-node]';
  npmlog.addLevel('silly', -Infinity, { inverse: true }, `${prefix} sill`);
  npmlog.addLevel('verbose', 1000, { fg: 'blue', bg: 'black' }, `${prefix} verb`);
  npmlog.addLevel('info', 2000, { fg: 'green' }, prefix);
  npmlog.addLevel('timing', 2500, { fg: 'green', bg: 'black' }, prefix);
  npmlog.addLevel('http', 3000, { fg: 'green', bg: 'black' }, prefix);
  npmlog.addLevel('notice', 3500, { fg: 'blue', bg: 'black' }, prefix);
  npmlog.addLevel('warn', 4000, { fg: 'black', bg: 'yellow' }, `${prefix} WARN`);
  npmlog.addLevel('error', 5000, { fg: 'red', bg: 'black' }, `${prefix} ERR!`);

  /* istanbul ignore if */
  if (PROFILE !== 'local') {
    npmlog.disableColor();
  }

  /* istanbul ignore next */
  if (NODE_ENV === 'test') {
    npmlog.level = 'silent';
  }

  log(level, '', message, ...args);
};
