/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('requests', table => {
    table.increments('id');
    table.integer('user').references('id').inTable('users').onDelete('CASCADE');
    table.string('req_date').notNullable();
    table.integer('org').nullable().references('id').inTable('orgs').onDelete('CASCADE');
    table.string('priority').nullable();
    table.string('req_code');
    table.string('req_title');
    table.string('description');
    table.string('justification');
    table.integer('requested').nullable().defaultTo(0);
    table.boolean('req_granted').defaultTo(false);
    table.integer('allocated').nullable().defaultTo(0);
    table.integer('obligated').nullable().defaultTo(0);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('requests');
};
