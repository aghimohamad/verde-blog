import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogCard from '../components/BlogCard'
import { fetchPosts } from '../redux/PostsSlice'

function Home() {

  const status = useSelector(state => state.posts.status)
  const posts = useSelector(state => state.posts.posts)
  const error = useSelector(state => state.posts.error)
  const dispatch = useDispatch()

  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts())
  }
  }, [status, dispatch])

  return (
    <div className=' mt-5'>
     {status === "loading" && <div>Loading...</div>}
      {status !== 'loading' && error ? <div>Error: {error}</div> : null}
      {status === "succeeded" && posts.length ? (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 '>
          {posts.map(post => (
            <Link key={post.id} to={`/posts/${post.id}`} >
            <BlogCard posts={posts} post={post} /> 
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default Home