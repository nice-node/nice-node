import './load-env';

const {
  APP_CODE,
  LOG_ROOT,
  DIST,
  PM2_EXEC_MODE,
  PM2_INSTANCES
} = process.env;

export default (options: any = {}) => ({
  name: APP_CODE,
  script: `${DIST}/index.js`,
  exec_mode: PM2_EXEC_MODE,
  instances: Number(PM2_INSTANCES),
  error_file: `${LOG_ROOT}/pm2.log`,
  out_file: `${LOG_ROOT}/pm2.log`,
  combine_logs: true,
  log_date_format: 'YYYY-MM-DD HH:mm',
  time: true,
  ...options
});
