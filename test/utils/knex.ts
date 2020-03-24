import should from 'should';
import NiceNode from '../../src/server';
import knex from '../../src/utils/knex';

describe('utils/log.ts', () => {
  // eslint-disable-next-line no-new
  new NiceNode();

  it('should return query sql', async () => {
    const sql = knex.select('*').from('account').toString();
    sql.should.equals('select * from `account`');
  });

  it('should return create table sql', async () => {
    const sql = knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('name');
      table.timestamps();
    }).toQuery();
    sql.should.equals('create table `users` (`id` int unsigned not null auto_increment primary key, `name` varchar(255), `created_at` datetime, `updated_at` datetime)');
  });
});
