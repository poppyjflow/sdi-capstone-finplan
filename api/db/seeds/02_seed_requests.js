//import { faker } from '@faker-js/faker';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { faker } = require("@faker-js/faker");

const years = [2022, 2023];
const numRecs = 40;
const priorities = ['MC/MP', 'ME', 'MEn'];
const pri_code_ids = ['TDY', 'IT Refresh', 'Furniture Refresh', 'Contract Services / Equipment', 'ESS Supplies', 'Fuel DVN', 'Gen Supplies GPC', 'Contract Services'];
const ranks = ['Maj','Lt Col','Col','Brig Gen','SMSgt','CMSgt'];
const units = ['163 ATKW','163 OG','163 OSS','196 ATKS','160 ATKS'];
const from = '2021-10-01';
const to = '2023-09-30';

const createRequests = () => {
  const fakeRequests = [];
  for (let j = 0; j < numRecs; j++) {
    const rqtAmt = faker.datatype.number({ min: 10000, max: 1000000 });
    const allocation = Math.round(rqtAmt * .9);
    const obligation = Math.round(allocation * faker.datatype.number({ min: .8, max: 1, precision: .1 }));

    const itemRqt = {
      user: 1,
      req_date: faker.date.between(from, to),
      org: faker.datatype.number({ min: 1, max: 3 }),
      priority: faker.datatype.number({ min: 1, max: 3 }),
      cost: rqtAmt,
      req_code: faker.helpers.arrayElement(pri_code_ids),
      req_title: faker.lorem.sentences(1),
      description: faker.lorem.sentences(3),
      req_impact: faker.lorem.sentences(3),
      allocated_funds: allocation,
      spent_funds: obligation
    };
    fakeRequests.push(itemRqt);
  }
  return fakeRequests;
};

exports.seed = async function (knex) {

  // Deletes ALL existing entries
  await knex('requests').del();
  await knex('requests').insert(createRequests());
};