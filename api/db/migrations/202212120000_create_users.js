/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.integer('org').nullable().references('id').inTable('orgs').onDelete('CASCADE');
    table.string('rank');
    table.string('l_name').notNullable;
    table.string('f_name').notNullable;
    table.string('password').notNullable();
    table.string('email').notNullable().unique();
    table.boolean('is_admin').defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
