/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable('quarterlies', table => {
    table.increments('id');
    table.integer('org').references('id').inTable('orgs');
    table.date('quarter_start');
    table.decimal('allocated_funds', [12], [2]);
    table.decimal('requested_funds', [12], [2]);
    table.decimal('spent_funds', [12], [2]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('quarterlies');
};
