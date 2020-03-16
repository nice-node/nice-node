const npmlog = require('npmlog');

// const prefix = '[nice-node]';
// npmlog.addLevel('silly', -Infinity, { inverse: true }, `${prefix} sill`);
// npmlog.addLevel('verbose', 1000, { fg: 'blue', bg: 'black' }, `${prefix} verb`);
// npmlog.addLevel('info', 2000, { fg: 'green' }, prefix);
// npmlog.addLevel('timing', 2500, { fg: 'green', bg: 'black' }, prefix);
// npmlog.addLevel('http', 3000, { fg: 'green', bg: 'black' }, prefix);
// npmlog.addLevel('notice', 3500, { fg: 'blue', bg: 'black' }, prefix);
// npmlog.addLevel('warn', 4000, { fg: 'black', bg: 'yellow' }, `${prefix} WARN`);
// npmlog.addLevel('error', 5000, { fg: 'red', bg: 'black' }, `${prefix} ERR!`);

npmlog.silly('silly');
npmlog.verbose('verbose');
npmlog.info('info');
npmlog.timing('timing');
npmlog.http('http');
npmlog.notice('notice');
npmlog.warn('warn');
console.log();
npmlog.error('error');
