export default (options: any) => ({
  apps: [
    {
      // name: appCode,
      script: 'dist/server.js',
      exec_mode: 'cluster',
      // instances: nodeEnv === 'production' ? 0 : 1,
      error_file: '../logs/error.log',
      out_file: '../logs/main.log',
      combine_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm',
      time: true,
      ...options
    }
  ]
});
