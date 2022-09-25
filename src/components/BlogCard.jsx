import React from 'react'
import { Link } from 'react-router-dom'

function BlogCard({post}) {
  return (
    <div className=' p-5 group bg-white shadow-lg rounded-md hover:scale-110 transition-all duration-150 cursor-pointer h-48 '>
        <h1 className=' truncate font-bold mb-4 group-hover:text-orange-500'  >{post.title}</h1>
        <p className=' line-clamp-4 text-[#888] '>{post.body}</p>
    </div>    
  )
}

export default BlogCard