import { resolve } from 'path';
import Koa from 'koa';
import requireAll from 'require-all';

const {
  REQUIRE_ALL_ROUTES_ROOR,
  REQUIRE_ALL_ROUTES_PATTERN
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
  const actions = requireAll({
    dirname: resolve(REQUIRE_ALL_ROUTES_ROOR),
    filter: new RegExp(REQUIRE_ALL_ROUTES_PATTERN),
    ...options
  });

  requireAllRoutes(actions, server);
};
