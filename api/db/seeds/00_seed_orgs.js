/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { majcoms } = require('../template-data/majcoms');
const { acc } = require('../template-data/acc');
const { aetc } = require('../template-data/aetc');
const { afgsc } = require("../template-data/afgsc");


exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('orgs').del();
  await knex('orgs').insert(
    [...majcoms,
    ...acc,
    ...aetc,
    ...afgsc,
    ]
  );
};
