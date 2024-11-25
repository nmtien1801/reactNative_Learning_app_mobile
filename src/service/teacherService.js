import axios from "axios";
import { Platform } from "react-native";
// import {REACT_APP_BACKEND_ANDROID_URL, REACT_APP_BACKEND_WEB_URL} from '@env'

const baseUrl =
  Platform.OS === "android"
    ? "http://192.168.1.5:8080/api" // URL cho Android và iOS
    : "http://localhost:8080/api"; // URL cho web hoặc môi trường khác

const handleTeacherOverview = (teacherID) => {
  return axios.get(`${baseUrl}/teacherOverview/${teacherID}`);
};

const handleFindCourseByTeacherID_Categories = (teacherID) => {
  return axios.get(`${baseUrl}/findCourseByTeacherID_Categories/${teacherID}`);
};

const addNewCourseService = (course) => {
  return axios.post(`${baseUrl}/addNewCourse`, course);
};

const updateCourseService = (course) => {
  return axios.put(`${baseUrl}/updateCourse`, course);
};

const deleteCourseService = (courseID) => {
  return axios.delete(`${baseUrl}/deleteCourse/${courseID}`);
}

export { handleTeacherOverview, handleFindCourseByTeacherID_Categories , addNewCourseService, updateCourseService, deleteCourseService };
