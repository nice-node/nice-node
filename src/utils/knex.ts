const { KNEX_CLIENT } = process.env;

// eslint-disable-next-line global-require
export default require('knex')({ client: KNEX_CLIENT });
