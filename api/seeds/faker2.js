function createRandomRequests(): Requests {
    const year_fy = faker.helpers.arrayElement([2022, 2023]);
    const quarter = faker.datatype.number({ min: 1, max: 4 });
    const description = faker.lorem.sentences(3);
    const request_amount = faker.datatype.number({ min: 10000, max: 1000000 });
    const allocation_amount = request_amount - faker.datatype.number({ min: 100, max: 9999 });
    const obligation_amount = '';
    const request_id = faker.datatype.number({ min: 1, max: 10 });
  
    const sex = this.faker.name.sexType();
    const firstName = faker.name.firstName(sex);
    const lastName = faker.name.lastName();
  
    return {
      _id: faker.datatype.uuid(),
      user_id: faker.image.avatar(),
      pri_ranking: faker.date.birthdate(),
      pri_code_id,
      request_code_id,
      desc_title,
      desc_details,
      desc_impact,
      subscriptionTier: faker.helpers.arrayElement(['free', 'basic', 'business']),
    };
  }

  const requests = createRandomRequests();