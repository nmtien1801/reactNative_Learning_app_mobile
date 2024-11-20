import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./authSlice";
import courseReducer from "./courseSlide";
import teacherReducer from "./teacherSlide";

export const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    teacher: teacherReducer,
  },
});
