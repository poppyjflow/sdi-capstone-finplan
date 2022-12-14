/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { majcoms } = require('../template-data/majcoms');
const { acc } = require('../template-data/acc');
const { aetc } = require('../template-data/aetc');
const { afgsc } = require("../template-data/afgsc");
const { afmc } = require("../template-data/afmc");
const { amc } = require("../template-data/amc");
const { afsoc } = require("../template-data/afsoc");
const { paf } = require("../template-data/paf");
const { usafe } = require("../template-data/usafe");
const { wing53d, group53d } = require("../template-data/wing53d");
const { wing57th, group57th } = require("../template-data/wing57th");


exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('orgs').del();
  await knex('orgs').insert(
    [...majcoms,
    ...acc,
    ...aetc,
    ...afgsc,
    ...afmc,
    ...afsoc,
    ...amc,
    ...paf,
    ...usafe,
    ...wing53d,
    ...wing57th,
    ...group53d,
    ...group57th,
    ]
  );
};
