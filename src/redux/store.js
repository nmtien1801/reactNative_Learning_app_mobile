import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import courseReducer from './courseSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    user: userReducer,
  },
})