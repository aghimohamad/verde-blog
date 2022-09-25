import axios from 'axios'
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'

const initialState = {
  status : 'idle',
  posts: [],
  error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  return axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.data)
    .then(res => {
      return res.filter(post => post.userId === 1)
    })
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (post) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', post)
  return response.data
})

export const updatePost = createAsyncThunk('posts/updatePost', async (form) => {
  const { id } = form;
  try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, form)
      return response.data
  } catch (err) {
      return form; 
  }
})


export const deletePost = createAsyncThunk('posts/deletePost', async ({id}) => {

  
  try {
      const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      if (response?.status === 200) return id;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      return err.message;
  }
})


const postslice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.posts = action.payload
      state.error = ''
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'failed'
      state.posts = []
      state.error = action.error.message
    })
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      const sortedPosts = state.posts.sort((a, b) => {
          if (a.id > b.id) return 1
          if (a.id < b.id) return -1
          return 0
      })
      if(!action.payload) {
        console.log("error");
      }
      console.log(action.payload);

      action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1; 
      action.payload.userId = 1
      console.log(action.payload)
      state.posts.push(action.payload)
  })
  builder.addCase(updatePost.fulfilled, (state, action) => {
      if (!action.payload?.id) {
          console.log('Update could not complete')
          console.log(action.payload)
          return;
      }
      console.log(action.payload);
      const { id } = action.payload;
      const posts = state.posts.filter(post => post.id !== id);
      state.posts = [...posts, action.payload];
  })
  builder.addCase(deletePost.fulfilled, (state, action) => {
      if (!action.payload) {
          console.log('Delete could not complete')
          console.log(action.payload)
          return;
      }
      const id  = action.payload;
      const posts = state.posts.filter(post => post.id !== id);
      state.posts = posts;
  })
    
  }
})

export const selectPostById = (state, postId) =>
    state.posts.posts.find(post => post.id === postId);

export default postslice.reducer