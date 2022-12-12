/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('table_name').del()
  await knex('table_name').insert([
    {id: 1, colName: 'rowValue1'},
    {id: 2, colName: 'rowValue2'},
    {id: 3, colName: 'rowValue3'}
  ]);
};

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('requests_allocations_obligations').del()

  const fakeUsers = [];
  const desiredFakeUsers = 10;

  for( let j=0; j<desiredFakeUsers; j++ ) {
    fakeUsers.push(createFakeUser());
  }

  await knex('requests_allocations_obligations').insert(fakeUsers)

  // await knex('requests_allocations_obligations').insert([
  //   {id: 1, year_fy: 2023, quarter: '2', description: '', request_amount: '', allocation_amount: '', obligation_amount: '', requests_id: },
  //   {id: 2, colName: 'rowValue2'},
  //   {id: 3, colName: 'rowValue3'}
  // ]);
};
