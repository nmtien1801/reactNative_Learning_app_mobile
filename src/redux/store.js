import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import courseReducer from "./courseSlice";
import userReducer from "./userSlice";
import teacherReducer from "./teacherSlide";
import lessonReducer from "./lessonSlice";
import reviewReducer from "./reviewSlice";
import projectReducer from "./projectSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlide";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    user: userReducer,
    teacher: teacherReducer,
    lesson: lessonReducer,
    review: reviewReducer,
    project: projectReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
});
