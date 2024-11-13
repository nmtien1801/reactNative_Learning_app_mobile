import axios from "axios";

const handleLoginApi = (email, password) => {
  return axios.post(`http://localhost:8080/api/login`, { email, password });
};

const logOutUser = () => {
  return axios.post("http://localhost:8080/api/logout");
};

export { handleLoginApi, logOutUser };
