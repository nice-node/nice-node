/**
 * pm2 配置文件
 * 如需覆盖默认配置，可以在调用时传入配置
 * 
 * @example
 * ecosystem({ script: 'entry.js' })
 */

const { ecosystemConfig } = require('nice-node');

const config = ecosystemConfig();
console.log(config);

module.exports = config;
