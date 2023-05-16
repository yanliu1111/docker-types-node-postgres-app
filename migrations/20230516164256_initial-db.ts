import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('posts', (table) => {
    table.specificType('id', 'CHAR(16)').primary();
    table.string('slug').notNullable().unique();
    //slug represents the url of the post
    table.string('title').notNullable();
    table.text('content');
    table.timestamp('published_at').index();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('posts');
}
