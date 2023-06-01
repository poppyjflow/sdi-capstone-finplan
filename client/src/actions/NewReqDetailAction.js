import axios from 'axios';
import { redirect } from 'react-router-dom';

const NewReqDetailAction = async (actionType, id, title, desc, justification) => {
  console.log(`NewReqDetailAction()...type=${actionType}`)
  if (actionType === 'POST') {
    // const { user, org, priority, reqCode, reqDate, requested, title, description, }
    //   = Object.fromEntries(await request?.formData());
    // axios.post('http://localhost:8080/requests', {
    //   user: user,
    //   org: org,
    //   reqCode: reqCode,
    //   priority: priority,
    //   reqDate: reqDate,
    //   requested: requested,
    //   title: title,
    //   description: description,
    //   justification: justification,
    // });
    return redirect('/main');
  }
  else if (actionType === 'PUT') {
    axios.put((`http://localhost:8080/requestdetails/${id}`), {
      req_title: title,
      description: desc,
      justification: justification,
    });
//    return redirect('/main');
    return null;
  }
  else if (actionType === 'DELETE') {
    // const { id } = Object.fromEntries(await request?.formData());
    // axios.delete(`http://localhost:8080/requests/${id}`);
    // return null;
  }
};

export default NewReqDetailAction;