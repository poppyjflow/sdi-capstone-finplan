import axios from 'axios';

const loginAction = async ({ request }) => {
  const { username, password } = Object.fromEntries(await request?.formData());
  console.log(`'From the route action: ' ${username}, ${password}`);

  const token = await axios.post(('http://localhost:8081/login'),
    {
      username: username,
      password: password,
    }
  );
  console.log('login action: ', token);
  if (token.data.auth) {
    sessionStorage.setItem('user', JSON.stringify({ auth: token.data.auth, user: username, id: token.data.id }));
    return {
      auth: token.data.auth,
      user: username,
      id: token.data.id,
    };
  }
  return null;
};

export default loginAction;