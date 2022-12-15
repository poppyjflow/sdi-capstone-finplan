/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('requests', table => {
    table.increments('id');
    table.integer('user').references('id').inTable('users').onDelete('CASCADE');
    table.date('req_date').notNullable();
    table.integer('org').nullable().references('id').inTable('orgs').onDelete('CASCADE');
    table.integer('priority').nullable();
    table.integer('cost').nullable();
    table.string('req_code');
    table.string('req_title');
    table.string('description');
    table.string('req_impact');
    table.boolean('req_granted').defaultTo(false);
    table.integer('allocated_funds').nullable();
    table.integer('spent_funds').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('requests');
};
