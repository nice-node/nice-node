import { existsSync } from 'fs';
import { resolve } from 'path';
import Koa from 'koa';
import deepmerge from 'deepmerge';
import requireAll from 'require-all';
import isNodeRuntime from './is-node-runtime';
import log from './log';

export interface RequireAllRoutesOptions {
  enable?: boolean;
  options?: {
    root?: string;
    pattern?: string;
  }
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
        log(`invalid router file: ${key}`);
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
    enable: REQUIRE_ALL_ROUTES_ENABLE === 'true',
    options: {
      root: REQUIRE_ALL_ROUTES_ROOR,
      pattern: REQUIRE_ALL_ROUTES_PATTERN
    }
  };
  const {
    enable,
    options: {
      root, pattern
    }
  } = deepmerge(defaultOptions, opts);

  if (enable) {
    /* istanbul ignore next */
    const src = isNodeRuntime ? DIST : 'src';
    /* istanbul ignore next */
    const ext = isNodeRuntime ? 'js' : 'ts';
    const dirname = resolve(root.replace('{src}', src));
    if (existsSync(dirname)) {
      const filter = new RegExp(pattern.replace('{ext}', ext));
      const actions = requireAll({
        dirname,
        filter,
        ...opts
      });

      requireAllRoutes(actions, server);
    } else {
      log(`\nno such directory, scandir '${dirname}'`);
    }
  }
};
