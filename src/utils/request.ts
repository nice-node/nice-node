/**
 * 具有打点功能拦截器的 axios 实例
 * axios@>=0.19 不允许在 axios config 中自定义配置项
 * 因此改成通过 config.headers 存储和传递变量
 *
 * config.headers.watcher 包含：
 * config.headers.watcher.metric {string} 打点名称
 * config.headers.watcher.startTime {date} 请求开始时间
 *
 * 记录的打点信息有：
 *  - increment(`${metric}.request`) 请求总次数
 *  - increment(`${metric}.error`)   请求错误次数
 *  - increment(`${metric}.timeout`) 请求超时次数
 *  - timing(metric, startTime);     请求耗时
 *
 * @example
 * const requestOptions = {
 *   headers: {
 *     watcher: {
 *       metric: 'home'
 *     }
 *   }
 * };
 * request.get(url, requestOptions);
 */


import axios, { AxiosInstance } from 'axios';
// import debug from 'debug-filename';
import { increment, timing } from './watcher';

const instance: AxiosInstance = axios.create({
  timeout: 1000
});

instance.interceptors.request.use((config) => {
  // Do something before request is sent
  const watcher = config.headers?.watcher;
  const metric = watcher?.metric;
  if (metric) {
    // 记录总请求数
    increment(`${metric}.request`);
    // 记录请求开始时间
    watcher.startTime = new Date();
  }

  return config;
}, (error) => {
  // Do something with request error
  const { metric } = error.config.headers?.watcher;

  if (metric) {
    increment(`${metric}.error`);
  }
  console.error(`获取数据失败: ${error}`);
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  const watcher = response?.config?.headers?.watcher;

  if (watcher?.metric) {
    timing(watcher?.metric, watcher?.startTime);
  }
  return response;
}, (error) => {
  const watcher = error.config?.headers?.watcher;
  const metric = watcher?.metric;
  if (metric) {
    increment(`${metric}.error`);
    if (error.message.indexOf('timeout') > -1) {
      increment(`${metric}.timeout`);
    }
  }
  console.error(`[error]${error?.config?.method} ${error?.config?.url} fail!`);
  return Promise.reject(error);
});

export default instance;
