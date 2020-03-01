import npmlog, { log, LogLevels } from 'npmlog';

export default (level: LogLevels | string, message: string, ...args: any[]) => {
  const { PROFILE, NODE_ENV } = process.env;
  const prefix: string = 'nice-node';

  /* istanbul ignore if */
  if (PROFILE !== 'local') {
    npmlog.disableColor();
  }

  /* istanbul ignore next */
  if (NODE_ENV === 'test') {
    npmlog.level = 'silent';
  }

  log(level, prefix, message, ...args);
};
