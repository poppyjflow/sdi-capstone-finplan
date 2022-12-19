/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('orgs', table => {
    table.increments('id');
    table.string('name');
    table.integer('group').nullable().references('id').inTable('orgs').onDelete('CASCADE');
    table.integer('wing').nullable().references('id').inTable('orgs').onDelete('CASCADE');
    table.integer('majcom').nullable().references('id').inTable('orgs').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('orgs');
};

