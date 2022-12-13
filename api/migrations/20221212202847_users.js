/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id'); // adds an auto incrementing PK column
        table.string('rank');
        table.string('fname');
        table.string('lname');
        table.string('unit');
        table.string('email');
        table.string('uname');
        table.string('passwd');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
