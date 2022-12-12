/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('requests_allocations_obligations', table => {
        table.increments('id'); // adds an auto incrementing PK column
        table.integer('year_fy');
        table.integer('quarter');
        table.string('description');
        table.integer('request_amount');
        table.integer('allocation_amount');
        table.integer('obligation_amount');
        table.string('requests_id');
      });    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('requests_allocations_obligations');
};
