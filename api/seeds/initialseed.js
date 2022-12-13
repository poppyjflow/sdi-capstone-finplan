//import { faker } from '@faker-js/faker';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { faker } = require("@faker-js/faker");

const years = [2022, 2023];
const numRecs = 20;
const priorities = ['MC/MP', 'ME', 'MEn'];
const pri_code_ids = ['TDY', 'IT Refresh', 'Furniture Refresh', 'Contract Services / Equipment', 'ESS Supplies', 'Fuel DVN', 'Gen Supplies GPC', 'Contract Services'];
const ranks = ['Maj','Lt Col','Col','Brig Gen','SMSgt','CMSgt'];
const units = ['163 ATKW','163 OG','163 OSS','196 ATKS','160 ATKS'];

const createUsers = () => {
  const fakeUsers = [];
  for (let j = 0; j < numRecs; j++) {
    const itemUsers = {

    rank: faker.helpers.arrayElement(ranks),
    fname: faker.name.firstName(),
    lname: faker.name.lastName(),
    unit: faker.helpers.arrayElement(units),
    email: faker.internet.email(),
    uname: faker.internet.email(),
    passwd: ''
   };
   fakeUsers.push(itemUsers);
  }
  return fakeUsers;
};

const createRAO = () => {
  const fakeRAO = [];
  for (let j = 0; j < numRecs; j++) {
    const rqtAmt = faker.datatype.number({ min: 10000, max: 1000000 });
    const item = {
      year_fy: faker.helpers.arrayElement([2022, 2023]),
      quarter: faker.datatype.number({ min: 1, max: 4 }),
      description: faker.lorem.sentences(3),
      request_amount: rqtAmt,
      allocation_amount: rqtAmt - faker.datatype.number({ min: 100, max: 9999 }),
      obligation_amount: null,
      requests_id: faker.datatype.number({ min: 1, max: 10 }),
    };
    fakeRAO.push(item);
  }
  return fakeRAO;
};

const createRequests = () => {
  const fakeRequests = [];
  for (let j = 0; j < numRecs; j++) {
    const rqtAmt = faker.datatype.number({ min: 10000, max: 1000000 });
    const itemRqt = {
      users_id: 1,
      pri_ranking: faker.datatype.number({ min: 1, max: numRecs }),
      pri_code_id: faker.helpers.arrayElement(priorities),
      request_code_id: faker.helpers.arrayElement(pri_code_ids),
      desc_title: faker.lorem.sentences(1),
      desc_details: faker.lorem.sentences(3),
      desc_impact: faker.lorem.sentences(3)
    };
    fakeRequests.push(itemRqt);
  }
  return fakeRequests;
};

exports.seed = async function (knex) {

  // Deletes ALL existing entries
  await knex('requests_allocations_obligations').del();
  await knex('requests_allocations_obligations').
  insert(createRAO());
  await knex('requests').del();
  await knex('requests').insert(createRequests());
  await knex('users').del();
  await knex('users').insert(createUsers());
};