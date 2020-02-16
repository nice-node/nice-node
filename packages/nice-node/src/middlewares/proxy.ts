/**
 * 请求代理
 * @param {object} options
 */

import proxy from 'koa-proxies';

export default (options: any = {}) => {
  const { PROXY_PATTERN, PROXY_TARGET } = process.env;

  const proxyOptions = {
    target: PROXY_TARGET,
    changeOrigin: true,
    // rewrite: (path) => path.replace(/^\/octocat(\/|\/\w+)?$/, '/vagusx'),
    logs: true,
    ...options
  };
  return proxy(PROXY_PATTERN, proxyOptions);
};
