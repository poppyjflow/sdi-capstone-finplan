/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { getUsers } = require('./seededUsers');


exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert(
    getUsers()
  );
};
