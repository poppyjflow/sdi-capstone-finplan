const getUsers = () => {

  const users = [];

  const user1 = {
    org: 1,
    branch: 'USSF',
    rank: 'Col',
    l_name: 'Doe',
    f_name: 'John',
    password: 'password',
    email: 'john@email.com',
    is_admin: true,
  }

  const user2 = {
    org: 2,
    branch: 'USAF',
    rank: 'Lt. Col',
    l_name: 'Smith',
    f_name: 'Jane',
    password: 'password',
    email: 'jane@email.com',
    is_admin: true,

  }

  const user3 = {
    org: 3,
    branch: 'USA',
    rank: '1LT',
    l_name: 'Brown',
    f_name: 'Robert',
    password: 'password',
    email: 'bob@email.com',
    is_admin: false,

  }

  users.push(user1, user2, user3);

  return users;
};

exports.getUsers = getUsers;