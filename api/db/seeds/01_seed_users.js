/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { getUsers } = require('../template-data/seededUsers');

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert(
    getUsers()
  );
};
