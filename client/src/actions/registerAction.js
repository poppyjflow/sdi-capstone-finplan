import axios from 'axios';
import { redirect } from 'react-router-dom';

const registerAction = async ({ request }) => {

  const {
    branch,
    rank,
    firstName,
    lastName,
    email,
    password
  } = Object.fromEntries(await request?.formData());

  console.log(`${branch}\n${rank}\n${firstName}\n${lastName}\n${email}\n${password}`);
  axios.post('http://localhost:8080/users',
    {
      branch: branch,
      rank: rank,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
  return (
    redirect('/')
  );
};

export default registerAction;