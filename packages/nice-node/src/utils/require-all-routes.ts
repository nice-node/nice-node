import { resolve } from 'path';
import Koa from 'koa';
import isNodeRuntime from '../utils/is-node-runtime';

const {
  REQUIRE_ALL_ROUTES_ROOR,
  REQUIRE_ALL_ROUTES_PATTERN,
  DIST
} = process.env;

function requireAllRoutes(actions: { default?: Function | Object }, server: Koa) {
  Object.keys(actions).forEach((key) => {
    const action = actions[key].default || actions[key];
    switch (typeof action) {
      case 'function':
        server.use(action);
        break;
      case 'object':
        requireAllRoutes(action, server);
        break;
      default:
        console.log(`invalid router file: ${key}`);
    }
  });
}

export default (server: Koa, options = {}) => {
  const src = isNodeRuntime ? DIST : 'src';
  const ext = isNodeRuntime ? 'js' : 'ts';
  const dirname = resolve(REQUIRE_ALL_ROUTES_ROOR.replace('${src}', src)); 
  const filter = new RegExp(REQUIRE_ALL_ROUTES_PATTERN.replace('${ext}', ext));
  const actions = require('require-all')({ // eslint-disable-line global-require
    dirname,
    filter,
    ...options
  });

  requireAllRoutes(actions, server);
};
