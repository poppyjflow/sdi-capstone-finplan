/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('requests', table => {
        table.increments('id'); // adds an auto incrementing PK column
        table.string('users_id');
        table.integer('pri_ranking');
        table.string('pri_code_id');
        table.string('request_code_id');
        table.string('desc_title');
        table.string('desc_details');
        table.string('desc_impact');
      });    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
      return knex.schema.dropTableIfExists('requests');
};
