import axios from "axios";
import { Platform } from "react-native";
// import {REACT_APP_BACKEND_ANDROID_URL, REACT_APP_BACKEND_WEB_URL} from '@env'

const baseUrl =
  Platform.OS === "android"
    ? "http://172.16.0.159:8080/api" // URL cho Android và iOS
    : "http://localhost:8080/api"; // URL cho web hoặc môi trường khác

const handleTeacherOverview = (teacherID) => {
  return axios.get(`${baseUrl}/teacherOverview/${teacherID}`);
};

export { handleTeacherOverview };
