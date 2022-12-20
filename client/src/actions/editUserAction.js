import axios from 'axios';
import { redirect } from 'react-router-dom';

const editUserAction = async ({ request }) => {

  const {
    org,
    user,
    rank,
    firstName,
    lastName,
    email,
  } = Object.fromEntries(await request?.formData());

  console.log('Org: ', org);
  console.log(`${org}\n${rank}\n${firstName}\n${lastName}\n${email}`);
  axios.put(`http://localhost:8080/users/${user}`,
    {
      org: org,
      rank: rank,
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
  return (
    redirect('/profile')
  );
};

export default editUserAction;