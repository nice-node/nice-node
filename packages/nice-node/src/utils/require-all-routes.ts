import { resolve } from 'path';
import Koa from 'koa';
import deepmerge from 'deepmerge';
import isNodeRuntime from '../utils/is-node-runtime';

export interface RequireAllRoutesOptions {
  enable?: boolean,
  options?: object
}

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

export default (server: Koa, opts: RequireAllRoutesOptions = {}) => {
  const {
    REQUIRE_ALL_ROUTES_ENABLE,
    REQUIRE_ALL_ROUTES_ROOR,
    REQUIRE_ALL_ROUTES_PATTERN,
    DIST
  } = process.env;
  
  const defaultOptions: RequireAllRoutesOptions = {
    enable: REQUIRE_ALL_ROUTES_ENABLE === 'true'
  };
  const { enable } = deepmerge(defaultOptions, opts);

  if (enable) {
    const src = isNodeRuntime ? DIST : 'src';
    const ext = isNodeRuntime ? 'js' : 'ts';
    const dirname = resolve(REQUIRE_ALL_ROUTES_ROOR.replace('${src}', src)); 
    const filter = new RegExp(REQUIRE_ALL_ROUTES_PATTERN.replace('${ext}', ext));
    const actions = require('require-all')({ // eslint-disable-line global-require
      dirname,
      filter,
      ...opts
    });

    requireAllRoutes(actions, server);
  }
};
