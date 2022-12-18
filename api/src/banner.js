const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[env];
const knex = require('knex')(config);

const getBannerData = async (res, org_id, year_fy) => {
  const dueDate = '2022-12-29';
  const from = (year_fy - 1) + '-10-01';
  const to = year_fy + '-09-30';
  let totalRequestsQ1 = 0, totalRequestsQ2 = 0, totalRequestsQ3 = 0, totalRequestsQ4 = 0;
  let totalAllocationsQ1 = 0, totalAllocationsQ2 = 0, totalAllocationsQ3 = 0, totalAllocationsQ4 = 0;
  let totalObligationsQ1 = 0, totalObligationsQ2 = 0, totalObligationsQ3 = 0, totalObligationsQ4 = 0;
  let totalDeltaQ1 = 0, totalDeltaQ2 = 0, totalDeltaQ3 = 0, totalDeltaQ4 = 0;
  let qry = [];
  let org_name = '';
  let returnObj = {};

  // get org_name from ORGS tbl.
  await knex('orgs')
    .select('name')
    .where('id', '=', org_id)
    .then(result => { org_name = result[0].name; })
    .catch(err => { res.status(400).json(err); });

  // get FY funding data from REQUESTS tbl.
  await knex('requests')
    .select('req_date', 'cost', 'allocated_funds', 'spent_funds')
    .where('org', org_id)
    .whereBetween('req_date', [from, to])
    .then(result => {
      qry = result;
    })
    .catch(err => {
      res.status(400).json(err);
    });

  // split return data by quarter.
  try {
    for (const j of qry) {
      const reqDate = new Date(j.req_date);
      switch (reqDate.getMonth()) {
        case 10:
        case 11:
        case 9:
          totalRequestsQ1 += j.cost;
          totalAllocationsQ1 += j.allocated_funds;
          totalObligationsQ1 += j.spent_funds;
          break;
        case 1:
        case 2:
        case 0:
          totalRequestsQ2 += j.cost;
          totalAllocationsQ2 += j.allocated_funds;
          totalObligationsQ2 += j.spent_funds;
          break;
        case 4:
        case 5:
        case 3:
          totalRequestsQ3 += j.cost;
          totalAllocationsQ3 += j.allocated_funds;
          totalObligationsQ3 += j.spent_funds;
          break;
        case 7:
        case 8:
        case 6:
          totalRequestsQ4 += j.cost;
          totalAllocationsQ4 += j.allocated_funds;
          totalObligationsQ4 += j.spent_funds;
          break;
        default:
          console.log(`Invalid Month field in DB: ${reqDate.getMonth()}`);
      }
    }

    // Calculate the delta (difference) between quarterly Allocations vs Obligations.
    totalDeltaQ1 = totalAllocationsQ1 - totalObligationsQ1;
    totalDeltaQ2 = totalAllocationsQ2 - totalObligationsQ2;
    totalDeltaQ3 = totalAllocationsQ3 - totalObligationsQ3;
    totalDeltaQ4 = totalAllocationsQ4 - totalObligationsQ4;

    // set the Status flag based on whether all allocated funds have been spent.
    statusFlag = false;
    if ((totalDeltaQ1 + totalDeltaQ2 + totalDeltaQ3 + totalDeltaQ4) === 0) statusFlag = true;

    // Now build the JSON return object.
    returnObj = {
      org_id: org_id,
      org_name: org_name,
      due_date: dueDate,
      status: statusFlag,
      q1:
      {
        requests: totalRequestsQ1,
        allocations: totalAllocationsQ1,
        obligations: totalObligationsQ1,
        delta: totalDeltaQ1,
      },
      q2:
      {
        requests: totalRequestsQ2,
        allocations: totalAllocationsQ2,
        obligations: totalObligationsQ2,
        delta: totalDeltaQ2,
      },
      q3:
      {
        requests: totalRequestsQ3,
        allocations: totalAllocationsQ3,
        obligations: totalObligationsQ3,
        delta: totalDeltaQ3,
      },
      q4:
      {
        requests: totalRequestsQ4,
        allocations: totalAllocationsQ4,
        obligations: totalObligationsQ4,
        delta: totalDeltaQ4,
      }
    };

    res.status(201).json(returnObj);
  }
  catch (err) {
    res.status(404).send(err);
  }
};

module.exports = { getBannerData };