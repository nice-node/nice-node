import knex from 'knex';

const { KNEX_CLIENT } = process.env;

export default knex({ client: KNEX_CLIENT });
