import path from 'path';
import isNodeRuntime from './is-node-runtime';

const runtime = isNodeRuntime ? 'JavaScript' : 'TypeScript';
console.log(`\nruntime environment: \n - ${runtime}`);

if (isNodeRuntime) {
  // js runtime 时 NODE_PATH 生效
  process.env.NODE_PATH = path.resolve(process.env.DIST);
  require('module').Module._initPaths(); // eslint-disable-line global-require,no-underscore-dangle
  console.log(`\nprocess.env.NODE_PATH:\n - ${process.env.NODE_PATH}`);
}
