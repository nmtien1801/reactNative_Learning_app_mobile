import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import courseReducer from './courseSlice'
import userReducer from './userSlice'
import teacherReducer from "./teacherSlide";
import lessonReducer from "./lessonSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    user: userReducer,
    teacher: teacherReducer,
    lesson: lessonReducer,
  },
});
