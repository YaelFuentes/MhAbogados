import axios from 'axios';

const userServiceFactory = () => {
  function login(username, password) {
    return axios.post(`/api/auth`, { username, password });
  }

  return { login };
};
const clientServiceFactory = () => {
  function login(username, password) {
    return axios.post(`/api/authClient`, { username, password })
  }
  return { login }
}

module.exports = {
  userServiceFactory,
  clientServiceFactory
};