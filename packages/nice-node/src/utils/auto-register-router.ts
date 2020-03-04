import { existsSync } from 'fs';
import { resolve } from 'path';
import Koa from 'koa';
import deepmerge from 'deepmerge';
import requireAll from 'require-all';
import isNodeRuntime from './is-node-runtime';
import log from './log';

export interface AutoRegisterRouterOptions {
  enable?: boolean;
  options?: {
    root?: string;
    pattern?: string;
  }
}

function autoRegisterRouter(actions: { default?: Function | Object }, server: Koa) {
  Object.keys(actions).forEach((key) => {
    const action = actions[key].default || actions[key];
    switch (typeof action) {
      case 'function':
        server.use(action);
        break;
      case 'object':
        autoRegisterRouter(action, server);
        break;
      default:
        log('warn', `invalid router file: ${key}`);
    }
  });
}

export default (server: Koa, opts: AutoRegisterRouterOptions = {}) => {
  const {
    AUTO_REGISTER_ROUTER_ENABLE,
    AUTO_REGISTER_ROUTER_ROOR,
    AUTO_REGISTER_ROUTER_PATTERN,
    DIST
  } = process.env;

  const defaultOptions: AutoRegisterRouterOptions = {
    enable: AUTO_REGISTER_ROUTER_ENABLE === 'true',
    options: {
      root: AUTO_REGISTER_ROUTER_ROOR,
      pattern: AUTO_REGISTER_ROUTER_PATTERN
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

      autoRegisterRouter(actions, server);
    } else {
      log('warn', `\nno such directory, scandir '${dirname}'`);
    }
  }
};
