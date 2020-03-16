import Koa from 'koa';
import { PugOptions as KoaPugOptions } from 'koa-pug';
import { resolve } from 'path';
import deepmerge from 'deepmerge';

export interface PugOptions {
  enable?: boolean;
  options?: KoaPugOptions
}

export default (server: Koa, opts: PugOptions = {}) => {
  const {
    PUG_ENABLE,
    PUG_BASEDIR,
    PUG_VIEWPATH
  } = process.env;

  const defaultOptions: PugOptions = {
    enable: PUG_ENABLE === 'true',
    options: {
      basedir: PUG_BASEDIR,
      viewPath: PUG_VIEWPATH
    }
  };

  const {
    enable,
    options
  } = deepmerge(defaultOptions, opts);

  if (enable) {
    // eslint-disable-next-line global-require,import/no-unresolved
    const Pug = require('koa-pug');
    const pug = new Pug({
      ...options,
      basedir: resolve(options.basedir),
      viewPath: resolve(options.viewPath)
    });
    pug.use(server);
  }
};
