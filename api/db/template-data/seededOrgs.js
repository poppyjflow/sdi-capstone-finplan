const getOrgs = () => {

  const orgs = [];

  const org1 = {
    name: 'Delta 7',
    children: [2, 3, 4],
    parent_org: null,
  }

  const org2 = {
    name: '72nd ISRS',
    children: [3, 4],
    parent_org: 1,
  }


  const org3 = {
    name: 'Detachment 5',
    children: [4],
    parent_org: 2,
  }

  const org4 = {
    name: 'Bravo Flight',
    children: null,
    parent_org: 3
  }

  orgs.push(org1, org2, org3, org4);

  return orgs;
};

exports.getOrgs = getOrgs;