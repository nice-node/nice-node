/* istanbul ignore file */
import path from 'path';
import isNodeRuntime from './is-node-runtime';
import log from './log';

const runtime = isNodeRuntime ? 'JavaScript' : 'TypeScript';
log(`\nruntime environment: \n - ${runtime}`);

if (isNodeRuntime) {
  // js runtime 时 NODE_PATH 生效
  process.env.NODE_PATH = path.resolve(process.env.DIST);
  require('module').Module._initPaths(); // eslint-disable-line global-require,no-underscore-dangle
  log(`\nprocess.env.NODE_PATH:\n - ${process.env.NODE_PATH}`);
}
