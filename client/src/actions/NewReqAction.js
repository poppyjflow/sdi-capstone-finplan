import axios from 'axios';
import { redirect } from 'react-router-dom';

const NewReqAction = async ({ request }) => {

  if (request.method === 'POST') {
    const { user, org, priority, reqCode, reqDate, requested, title, description, }
      = Object.fromEntries(await request?.formData());
    axios.post('http://localhost:8080/requests', {
      user: user,
      org: org,
      reqCode: reqCode,
      priority: priority,
      reqDate: reqDate,
      requested: requested,
      title: title,
      description: description,
    });
    return redirect('/main');
  }
  else if (request.method === 'PUT') {
    const { id, reqCode, priority, reqDate, requested, allocated, obligated, title, description, }
      = Object.fromEntries(await request?.formData());
    axios.put((`http://localhost:8080/requests/${id}`), {
      reqCode: reqCode,
      priority: priority,
      reqDate: reqDate,
      requested: requested,
      allocated: allocated,
      obligated: obligated,
      title: title,
      description: description,
    });
    return null;
  }
  else if (request.method === 'DELETE') {
    const { id } = Object.fromEntries(await request?.formData());
    axios.delete(`http://localhost:8080/requests/${id}`);
    return null;
  }
};

export default NewReqAction;