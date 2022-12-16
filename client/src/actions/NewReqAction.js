import axios from 'axios';
import { redirect } from 'react-router-dom';

const NewReqAction = async ({ request }) => {
  const {
    user,
    org,
    priority,
    reqCode,
    reqDate,
    cost,
    title,
    description,
    impact,
  } = Object.fromEntries(await request?.formData());

  console.log(cost);
  console.log(typeof cost);
  const formattedCost = cost.replaceAll(',', '');
  console.log(
    `${user}\n${org}\n${priority}\n${reqCode}\n${reqDate}\n${formattedCost}\n${title}\n${description}\n${impact}`
  );
  const res = await axios.post('http://localhost:8080/requests',
    {
      user: user,
      org: org,
      reqCode: reqCode,
      priority: priority,
      reqDate: reqDate,
      cost: formattedCost,
      title: title,
      description: description,
      impact: impact,
    });
  console.log('new req action', res);
  return res;
};

export default NewReqAction;