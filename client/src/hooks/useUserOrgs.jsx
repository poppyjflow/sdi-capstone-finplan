import { useState } from 'react';

const useUserOrgs = (userOrg, orgArray) => {
  const [userOrgs, setUserOrgs] = useState([userOrg]);

  const res = orgArray.reduce((result, org) => {
    if (userOrgs.includes(org.parent_org)) {

      return null;
    }
  });

  return [userOrgs, setUserOrgs];
};

export default useUserOrgs;

//[
//  {id: 1,},
//  {id: 3, parent: 4},
//  {id: 2, parent: 1},
//  {id: 4, parent: 2},
//]

//[1, 2]

// if (userOrgs.includes(org.parent_org)) {
//   result.push(org)
//    const grandchild = (orgArray.find((child) => child.parent_org === org.id))
//     if (grandchild) result.push(child)
//
//
//  }