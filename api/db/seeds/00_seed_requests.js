/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { faker } = require('@faker-js/faker');

const createFakeInventory = () => {
  const fakeInventory = [];
  const requests = ['TDY', 'FURNITURE', 'RECREATION', 'MORALE', 'R&D'];

  for (let i = 0; i < 500; i++) {
    const item = {
      user: Math.ceil(Math.random() * 20),
      priority: Math.ceil(Math.random() * 5),
      request_code: (requests[Math.floor(Math.random() * 5)]),
      request_title: faker.lorem.sentence(4),
      description: faker.lorem.sentence(5),
    };
    fakeInventory.push(item);
  }
  return fakeInventory;
};

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('requests').del();
  await knex('requests').insert(
    createFakeInventory()
  );
};
