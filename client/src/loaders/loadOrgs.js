import axios from 'axios';

const loadOrgs = async () => {
  try {
    const req = await axios.get('http://localhost:8080/orgs');
    return req.data;
  } catch (error) {
    return ([]);
  }
};

export default loadOrgs;