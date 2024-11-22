import axios from "axios";
import { Platform } from "react-native";
// import {REACT_APP_BACKEND_ANDROID_URL, REACT_APP_BACKEND_WEB_URL} from '@env'

const baseUrl =
  Platform.OS === "android"
    ? "http://172.16.0.159:8080/api" // URL cho Android và iOS
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

const findAllCoursesService = () => {
  return axios.get(`${baseUrl}/findAllCourses`);
};

const getTopTeacherService = () => {
  return axios.get(`${baseUrl}/getTopTeacher`);
};

const findPopularCourseService = () => {
  return axios.get(`${baseUrl}/findPopularCourses`);
};

const findCourseByIDService = (id) => {
  return axios.get(`${baseUrl}/findCourseByID/${id}`);
};

const findCourseSimilarService = (id) => {
  return axios.get(`${baseUrl}/findCourseSimilar/${id}`);
}

const findCourseByStateService = (state) => {
  return axios.get(`${baseUrl}/findCourseByState/${state}`);
};
export {
  handleLoginApi,
  logOutUser,
  registerUser,
  findAllCoursesService,
  getTopTeacherService,
  findPopularCourseService,
  findCourseByIDService,
  findCourseSimilarService,
  findCourseByStateService,
};
