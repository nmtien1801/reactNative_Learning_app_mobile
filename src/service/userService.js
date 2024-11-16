import axios from "axios";
import { Platform } from "react-native";
import {REACT_APP_BACKEND_ANDROID_URL, REACT_APP_BACKEND_WEB_URL} from '@env'

const baseUrl =
  Platform.OS === "android"
    ? REACT_APP_BACKEND_ANDROID_URL // URL cho Android và iOS
    : REACT_APP_BACKEND_WEB_URL; // URL cho web hoặc môi trường khác

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
