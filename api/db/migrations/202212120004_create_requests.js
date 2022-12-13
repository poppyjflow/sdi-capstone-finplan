/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('requests', table => {
    table.increments('id');
    table.integer('user').references('id').inTable('users').onDelete('CASCADE');
    table.integer('quarter').references('id').inTable('quarterlies').onDelete('CASCADE');
    table.integer('priority').nullable();
    table.decimal('cost', [12], [2]).nullable();
    table.string('request_code');
    table.string('request_title');
    table.string('description');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('requests');
};
