import axios from 'axios';
import { redirect } from 'react-router-dom';

const NewReqAction = async ({ request }) => {

  if (request.method === 'POST') {
    const { user, org, priority, reqCode, reqDate, cost, title, description, impact, } = Object.fromEntries(await request?.formData());
    const formattedCost = cost.replaceAll(',', '');
    console.log(
      `${user}\n${org}\n${priority}\n${reqCode}\n${reqDate}\n${formattedCost}\n${title}\n${description}\n${impact}`
    );
    const res = await axios.post('http://localhost:8080/requests', {
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
    console.log('new req action POST', res);
    return redirect('/main');
  }
  else if (request.method === 'PUT') {
    const { priority, reqCode, cost, title, description, impact, } = Object.fromEntries(await request?.formData());
    const formattedCost = cost.replaceAll(',', '');
    const res = await axios.put(('http://localhost:8080/requests'), {
      reqCode: reqCode,
      priority: priority,
      cost: formattedCost,
      title: title,
      description: description,
      impact: impact,
    });
    console.log('New Item Action PUT: ', res);
    return null;
  }
  else if (request.method === 'DELETE') {
    const { id } = Object.fromEntries(await request?.formData());
    console.log('Delete method: ', id);
    const res = await axios.delete(`http://localhost:8080/requests/${id}`);
    console.log('New Item Action DELETE: ', res);
    return null;
  }
};

export default NewReqAction;