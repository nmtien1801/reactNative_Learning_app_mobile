import axios from "axios";
import { Platform } from "react-native";

const baseUrl =
  Platform.OS === "android" 
    ? "http://192.168.1.6:8080/api" // URL cho Android và iOS
    : "http://localhost:8080/api"; // URL cho web hoặc môi trường khác

const handleLoginApi = (email, password) => {
  return axios.post(`${baseUrl}/login`, { email, password });
};

const logOutUser = () => {
  return axios.post(`${baseUrl}/logout`);
};

const registerUser = (email, userName, password) => {
  return axios.post(`${baseUrl}/register`, { email, userName, password });
};

export { handleLoginApi, logOutUser, registerUser };
