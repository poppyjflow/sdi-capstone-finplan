exports.seed = async function (knex) {
 // Deletes ALL existing entries
  await knex('requests').del();
  await knex('requests').insert([
    {
      user: 2,
      req_date: '2022-11-16',
      org: 138,
      priority: 'ME',
      req_code: 'CS',
      req_title: 'Comm contractor for ops center',
      description: 'Require 1x Comm Field Service Representative (FSR) to support daily operations for one year due to in-house manning losses',
      requested: 240000,
      req_granted: true,
      allocated: 240000,
      obligated: 240000,
    },
    {
      user: 2,
      req_date: '2022-11-19',
      org: 138,
      priority: 'MC',
      req_code: 'TDY',
      req_title: 'Exercise MADEUP NAME support',
      description: 'Require 12x personnel ISO major named exercise due to direct request from COCOM to demonstrate ACE capability--includes separate TDYs for planning, ADVON, & execution',
      requested: 370000,
      req_granted: true,
      allocated: 370000,
      obligated: 204860,
    },
    {
      user: 2,
      req_date: '2023-02-14',
      org: 138,
      priority: 'ME',
      req_code: 'IT',
      req_title: 'IT Refresh for deployable ground kits',
      description: 'Require jkhg .jhkjh glkjh.kj hglk jhlkjyy rfiu yoghoijhlkhf kjhlgjhhlkhfkjhyglkjhbkjh gf khjhlkjbg khjjhj',
      requested: 180000,
      req_granted: false,
      allocated: 110000,
      obligated: 30000,
    },
    {
      user: 2,
      req_date: '2023-07-28',
      org: 138,
      priority: 'MEn',
      req_code: 'GS',
      req_title: 'Squadron office supplies',
      description: 'Pens, printer paper + cartridges, notepads, paper clips, etc',
      requested: 80000,
      req_granted: false,
      allocated: 10000,
      obligated: 4000,
    },
    {
      user: 2,
      req_date: '2023-04-09',
      org: 138,
      priority: 'MC',
      req_code: 'F-Dvn',
      req_title: 'Fuel for our stuff',
      description: 'Need fuel so our stuff will work--otherwise it won\'t',
      requested: 240000,
      req_granted: true,
      allocated: 240000,
      obligated: 120000,
    },    {
      user: 2,
      req_date: '2022-02-14',
      org: 138,
      priority: 'ME',
      req_code: 'IT',
      req_title: 'IT Refresh for airborne nav kits',
      description: 'Require kgjgdfgdfhjng jhkgkjgfhj kghgkjhggd ytgghg ughf gyhjg hjf  ukyhjgjkmg hjf hfjg',
      requested: 140000,
      req_granted: false,
      allocated: 120000,
      obligated: 120000,
    },
    {
      user: 2,
      req_date: '2022-07-28',
      org: 138,
      priority: 'MEn',
      req_code: 'GS',
      req_title: 'Squadron office supplies',
      description: 'Pens, printer paper + cartridges, notepads, paper clips, etc',
      requested: 75000,
      req_granted: false,
      allocated: 10000,
      obligated: 10000,
    },
    {
      user: 2,
      req_date: '2021-12-09',
      org: 138,
      priority: 'MC',
      req_code: 'F-Dvn',
      req_title: 'Fuel for our stuff',
      description: 'Need fuel so our stuff will work--otherwise it won\'t',
      requested: 220000,
      req_granted: true,
      allocated: 220000,
      obligated: 220000,
    },
  ]
  );
};