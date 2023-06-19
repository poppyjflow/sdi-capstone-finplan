/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('requests', table => {
    table.increments('id');
    table.integer('user').references('id').inTable('users').onDelete('CASCADE');
    // table.string('req_date').notNullable();
    table.string('fy').notNullable();
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
    table.integer('delta').nullable().defaultTo(0);
    table.integer('q1requested').nullable().defaultTo(0);
    table.integer('q1allocated').nullable().defaultTo(0);
    table.integer('q1obligated').nullable().defaultTo(0);
    table.integer('q1delta').nullable().defaultTo(0);
    table.integer('q2requested').nullable().defaultTo(0);
    table.integer('q2allocated').nullable().defaultTo(0);
    table.integer('q2obligated').nullable().defaultTo(0);
    table.integer('q2delta').nullable().defaultTo(0);
    table.integer('q3requested').nullable().defaultTo(0);
    table.integer('q3allocated').nullable().defaultTo(0);
    table.integer('q3obligated').nullable().defaultTo(0);
    table.integer('q3delta').nullable().defaultTo(0);
    table.integer('q4requested').nullable().defaultTo(0);
    table.integer('q4allocated').nullable().defaultTo(0);
    table.integer('q4obligated').nullable().defaultTo(0);
    table.integer('q4delta').nullable().defaultTo(0);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('requests');
};
