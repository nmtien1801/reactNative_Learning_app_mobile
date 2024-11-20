import { configureStore } from '@reduxjs/toolkit'
import userReducer from './authSlice'
import courseReducer from './courseSlide'

export const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer
  },
})