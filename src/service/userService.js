import axios from "axios";
import { Platform } from "react-native";
// import {REACT_APP_BACKEND_ANDROID_URL, REACT_APP_BACKEND_WEB_URL} from '@env'

const baseUrl =
  Platform.OS === "android"
    ? "http://192.168.1.5:8080/api" // URL cho Android và iOS
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
};

const getAllLessonService = (state) => {
  return axios.get(`${baseUrl}/getAllLesson`);
};

const getReviewByCourseService = (id) => {
  return axios.get(`${baseUrl}/findReviewByCourseID/${id}`);
};

const getCourseOfUserService = (id) => {
  return axios.get(`${baseUrl}/getCourseOfUser/${id}`); // chỉ lấy người hướng dẫn
};

const getAllCourseUserService = (userID) => {
  return axios.get(`${baseUrl}/getAllCourseUser/${userID}`); // lấy all
};

const findCourseUserState1Service = (userID) => {
  return axios.get(`${baseUrl}/findCourseUserState1/${userID}`);
};

const findCourseUserState2Service = (userID) => {
  return axios.get(`${baseUrl}/findCourseUserState2/${userID}`);
};

const getProjectByUserService = (userID) => {
  return axios.get(`${baseUrl}/getProjectByUser/${userID}`);
};

const createProjectService = (data) => {
  return axios.post(`${baseUrl}/createProject`, data);
};

//get cart by user
const getCartByUserService = (userID) => {
  return axios.get(`${baseUrl}/getCartByUser/${userID}`);
};

//add to cart
const addToCartService = (data) => {
  return axios.post(`${baseUrl}/addToCart`, data);
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
  getAllLessonService,
  getReviewByCourseService,
  getCourseOfUserService,
  getAllCourseUserService,
  findCourseUserState1Service,
  findCourseUserState2Service,
  getProjectByUserService,
  createProjectService,
  getCartByUserService,
  addToCartService,
};
