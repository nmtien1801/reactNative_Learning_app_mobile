import axios from "axios";
import { Platform } from "react-native";
// import {REACT_APP_BACKEND_ANDROID_URL, REACT_APP_BACKEND_WEB_URL} from '@env'

const baseUrl =
  Platform.OS === "android"
    ? "http:// 172.16.0.159:8080/api" // URL cho Android và iOS
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

const addCourseToCart = (courseID, userID) => {
  // Kiểm tra trước khi gửi request
  console.log(
    "Adding course to cart with courseID:",
    courseID,
    "and userID:",
    userID
  );
  return axios.post(`${baseUrl}/addCourseToCart`, { courseID, userID });
};
const deleteCartSelected = async (courseID) => {
  console.log("courseID", courseID);
  try {
    const response = await axios.post(`${baseUrl}/cart/deleteSelectedCourse`, {
      courseID,
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error.response || error.message);
    throw error;
  }
};

// history cart getOrdersByUserId
const getOrdersByUserId = (userID) => {
  return axios.get(`${baseUrl}/getOrderByUserID/${userID}`);
};

//search course
const searchCourseService = (keyword) => {
  return axios.get(`${baseUrl}/searchCourse/${keyword}`);
};
const buyCourseService = async (courseIDs, userID) => {
  return axios.post(`${baseUrl}/buyCourses`, {
    userID,
    courseIDs,
  });
};
const createReview = async (courseID, userID, rating) => {
  try {
    const response = await axios.post(`${baseUrl}/createReview`, {
      courseID,
      userID,
      rating,
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo review:", error.response || error.message);
    throw error;
  }
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
  addCourseToCart,
  searchCourseService,
  deleteCartSelected,
  getOrdersByUserId,
  buyCourseService,
  createReview,
};
