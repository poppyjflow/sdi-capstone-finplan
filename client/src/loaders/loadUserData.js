import axios from 'axios';

const loadUserData = async () => {
  try {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const req = await axios.get(`http://localhost:8080/users/${user.id}`);
    return req.data[0];
  } catch (error) {
    return ([]);
  }
};

export default loadUserData;