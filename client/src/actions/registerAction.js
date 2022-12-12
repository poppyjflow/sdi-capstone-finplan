import axios from 'axios';
import { redirect } from 'react-router-dom';

const registerAction = async ({ request }) => {

  const {
    firstName,
    lastName,
    email,
    username,
    password
  } = Object.fromEntries(await request?.formData());

  console.log(`${firstName}\n${lastName}\n${email}\n${username}\n${password}`);
  axios.post('http://localhost:8081/users',
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password,
    });
  return (
    redirect('/')
  );
};

export default registerAction;