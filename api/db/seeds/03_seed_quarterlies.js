/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { faker } = require('@faker-js/faker');

const createFakeQuarterlies = () => {

  const fakeQuarterlies = [];
  const quarters = [
    new Date('October 1, 2021'),
    new Date('January 1, 2021'),
    new Date('April 1, 2021'),
    new Date('July 1, 2021')
  ];

  for (let i = 0; i < 500; i++) {
    const item = {
      org: Math.ceil(Math.random() * 4),
      quarter_start: quarters[Math.floor(Math.random() * 4)],
      allocated_funds: faker.finance.amount(100000, 10000000, 2),
      requested_funds: faker.finance.amount(100000, 10000000, 2),
      spent_funds: faker.finance.amount(0, 9999999, 2),
    };
    fakeQuarterlies.push(item);
  }
  return fakeQuarterlies;
};

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('quarterlies').del();
  await knex('quarterlies').insert(
    createFakeQuarterlies()
  );
};