import axios from 'axios';
import { redirect } from 'react-router-dom';

const NewQuarterliesAction = async (actionType, id,
  q1Requested, q1Allocated, q1Obligated,
  q2Requested, q2Allocated, q2Obligated,
  q3Requested, q3Allocated, q3Obligated,
  q4Requested, q4Allocated, q4Obligated,) => {
  console.log(`NewQuarterliesAction()...type=${actionType}`)
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
    axios.put((`http://localhost:8080/requestquarterlies/${id}`), {
      q1Requested: q1Requested,
      q1Allocated: q1Allocated,
      q1Obligated: q1Obligated,
      q2Requested: q2Requested,
      q2Allocated: q2Allocated,
      q2Obligated: q2Obligated,
      q3Requested: q3Requested,
      q3Allocated: q3Allocated,
      q3Obligated: q3Obligated,
      q4Requested: q4Requested,
      q4Allocated: q4Allocated,
      q4Obligated: q4Obligated,
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

export default NewQuarterliesAction;