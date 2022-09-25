import { configureStore } from '@reduxjs/toolkit'
import postsReducer from "./PostsSlice"
import postReducer from "./postSlice"

export const store = configureStore({
  reducer: {
    posts : postsReducer,
    post : postReducer
  },
})
