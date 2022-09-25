import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  post: {},
  error: ''
}
export const fetchPost = createAsyncThunk('post/fetchPost', async (id) => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response => response.data)
})

export const deletePost = createAsyncThunk('post/deletePost', async (id) => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE"
    } )
    .then(response => {
        console.log("delleted", response.data);
       return response.data
    })
})

const postlice = createSlice({
  name: 'post',
  initialState,
  extraReducers:  {
    [fetchPost.pending] : (state) => {
      state.loading = true
    },
    [fetchPost.fulfilled] : (state, action) => {
      state.loading = false
      state.post = action.payload
      state.error = ''
    },
    [fetchPost.rejected] : (state, action) => {
      state.loading = false
      state.post = {}
      state.error = action.error.message
    },
    [deletePost.pending] : (state) => {
        state.loading = true
    },
    [deletePost.fulfilled] : (state, action) => {
        state.loading = false
      state.post = null
      state.error = ''
    },
    [deletePost.rejected] : (state, action) => {
        state.loading = false;
        state.error = action.payload
    },

  }
})

export default postlice.reducer