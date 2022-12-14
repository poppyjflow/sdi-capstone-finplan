import axios from 'axios';

const loginAction = async ({ request }) => {
  const { email, password } = Object.fromEntries(await request?.formData());
  console.log(`'From the route action: ' ${email}, ${password}`);

  const token = await axios.post(('http://localhost:8080/login'),
    {
      email: email,
      password: password,
    }
  );
  console.log('login action: ', token);
  if (token.data.auth) {
    sessionStorage.setItem('user', JSON.stringify({ auth: token.data.auth, user: email, id: token.data.id }));
    return {
      auth: token.data.auth,
      user: email,
      id: token.data.id,
    };
  }
  return null;
};

export default loginAction;