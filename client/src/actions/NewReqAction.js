import axios from 'axios';
import { redirect } from 'react-router-dom';

const NewReqAction = async ({ request }) => {

  if (request.method === 'POST') {
    const { user, org, priority, reqCode, fy, requested, title, description, justification, }
      = Object.fromEntries(await request?.formData());
    await axios.post('http://localhost:8080/requests', {
      user: user,
      org: org,
      reqCode: reqCode,
      priority: priority,
      fy: fy,
      requested: requested,
      title: title,
      description: description,
      justification: justification,
    });

    // Reloads the webpage to trigger a DB pull.
//    window.location.reload(true);

    return redirect('/main');
  }
  else if (request.method === 'PUT') {
    const { id, reqCode, priority, reqDate, requested, allocated, obligated, title, description, justification, }
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
      justification: justification,
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