import axios from "axios";

const handleLoginApi = (valueLogin, password) => {
  return axios.post(`/api/login`, { valueLogin, password });
};

export { handleLoginApi };
