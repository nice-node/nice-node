import Statsd from 'statsd-client';

const {
  WATCHER_ENABLE,
  WATCHER_HOST,
  WATCHER_PORT = '8125',
  WATCHER_PREFIX
} = process.env;

const enable = WATCHER_ENABLE === 'true';

/**
 * fetch client
 * @return {[statsd]}
 */
let client: Statsd;
function getClient() {
  if (!client) {
    client = new Statsd({
      host: WATCHER_HOST,
      port: parseInt(WATCHER_PORT, 10),
      prefix: WATCHER_PREFIX
    });
  }
  return client;
}

/**
 * 记录时间差毫秒数
 * @param {string} metric 监控名称，自动补齐 `.time`
 * @param {Date|number} time 时间对象或毫秒数。
 * 如果参数为时间对象时，记录当前时间与时间对象的差值。
 * 如果参数为毫秒数时，直接记录该数字。
 */
export const timing = (metric: string, time: number|Date) => {
  if (enable) {
    const terminator = '.time';
    if (metric.endsWith && !metric.endsWith(terminator)) {
      metric += terminator;
    }
    getClient().timing(metric, time);
  }
};

/**
 * 增加计数
 * @param {string} metric 监控名称
 * @param {number} [count=1] 次数，可选，默认值：1
 */
export const increment = (metric: string, count: number = 1) => {
  if (enable) {
    getClient().increment(metric, count);
  }
};
