require('easy-node/dist/utils/load-env');

const {
  APP_CODE,
  LOG_ROOT,
  DIST,
  PM2_EXEC_MODE,
  PM2_INSTANCES
} = process.env;

module.exports = {
  apps: [
    {
      name: APP_CODE,
      script: `${DIST}/index.js`,
      exec_mode: PM2_EXEC_MODE,
      instances: PM2_INSTANCES,
      error_file: `${LOG_ROOT}/pm2.error.log`,
      out_file: `${LOG_ROOT}/pm2.out.log`,
      combine_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm',
      time: true
    }
  ]
};
