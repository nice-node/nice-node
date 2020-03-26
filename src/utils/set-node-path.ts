/* istanbul ignore file */
import path from 'path';
import isNodeRuntime from './is-node-runtime';
import log from './log';

if (isNodeRuntime) {
  // js runtime 时 NODE_PATH 生效
  process.env.NODE_PATH = path.resolve(process.env.DIST);
  require('module').Module._initPaths(); // eslint-disable-line global-require,no-underscore-dangle
  log('info', `
set process.env.NODE_PATH=${process.env.NODE_PATH}
`);
}
