/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable('quarterlies', table => {
    table.increments('id');
    table.integer('org').references('id').inTable('orgs');
    table.date('quarter_start');
    table.integer('allocated_funds');
    table.integer('requested_funds');
    table.integer('spent_funds');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('quarterlies');
};
