const { KNEX_CLIENT, MYSQL_ENABLE, NODE_ENV } = process.env;

export default MYSQL_ENABLE === 'true' || NODE_ENV === 'test'
  // eslint-disable-next-line global-require
  ? require('knex')({ client: KNEX_CLIENT })
  : null;
