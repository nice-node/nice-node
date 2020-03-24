const { KNEX_CLIENT, MYSQL_ENABLE } = process.env;

// eslint-disable-next-line global-require
export default MYSQL_ENABLE === 'true' ? require('knex')({ client: KNEX_CLIENT }) : null;
