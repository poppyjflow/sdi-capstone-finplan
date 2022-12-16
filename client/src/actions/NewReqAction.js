import axios from 'axios';
import { redirect } from 'react-router-dom';

const NewReqAction = async ({ request }) => {
  const {
    user,
    org,
    priority,
    reqCode,
    reqDate,
    title,
    description,
    impact,
  } = Object.fromEntries(await request?.formData());

  console.log(
    `${user}\n${org}\n${priority}\n${reqCode}\n${reqDate}\n${title}\n${description}\n${impact}`
  );
  axios.post('http://localhost:8080/request',
    {
      user: user,
      org: org,
      reqCode: reqCode,
      reqDate: reqDate,
      title: title,
      description: description,
      impact: impact,
    });
  return (
    redirect('/')
  );
};

export default NewReqAction;