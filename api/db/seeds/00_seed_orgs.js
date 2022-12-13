/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { getOrgs } = require('./seededOrgs');


exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('orgs').del();
  await knex('orgs').insert(
    getOrgs()
  );
};
