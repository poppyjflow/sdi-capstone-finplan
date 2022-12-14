const getOrgs = () => {

  const orgs = [];

  const org2 = {
    name: 'Delta 7',
    parent_org: null,
  }

  const org1 = {
    name: '72nd ISRS',
    parent_org: 1,
  }


  const org3 = {
    name: 'Detachment 5',
    parent_org: 2,
  }

  orgs.push(org1, org2, org3);

  return orgs;
};

exports.getOrgs = getOrgs;