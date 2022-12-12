import { faker } from '@faker-js/faker';

function createRandomRequestsAllocationsObligations() {
  const year_fy = faker.helpers.arrayElement([2022, 2023]);
  const quarter = faker.datatype.number({ min: 1, max: 4 });
  const description = faker.lorem.sentences(3);
  const request_amount = faker.datatype.number({ min: 10000, max: 1000000 });
  const allocation_amount = request_amount - faker.datatype.number({ min: 100, max: 9999 });
  const obligation_amount = '';
  const request_id = faker.datatype.number({ min: 1, max: 10 })

  return {
    _id: faker.datatype.uuid(),
    year_fy,
    quarter,
    description,
    request_amount,
    allocation_amount,
    obligation_amount,
    request_id
  };
}

const user = createRandomRequestsAllocationsObligations();