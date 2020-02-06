/**
 * pm2 配置文件
 * 如需覆盖默认配置，可以在调用时传入配置
 * 
 * @example
 * ecosystem({ script: 'entry.js' })
 */

const ecosystem = require('nice-node/ecosystem.config').default;

const config = ecosystem();
console.log(config);

module.exports = config;
