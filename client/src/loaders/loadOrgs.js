import axios from 'axios';

const loadOrgs = async () => {
  try {
    return await axios.get('http://localhost:8080/orgs');
  } catch (error) {
    return ([]);
  }
};

export default loadOrgs;