import React from 'react'
import { AiFillBell } from "react-icons/ai"
import { RiAppsFill } from "react-icons/ri"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function Navbar() {

  const posts = useSelector(state => state.posts.posts)
  const navigate = useNavigate()

  return (
    <div className='flex justify-between bg-white rounded-sm p-2 shadow-md '>
        <div className='flex items-center '>
            <img src="/Blogger.svg.png" alt="blogger" className='h-8 w-8 mr-4' />
            <h1 className=' font-bold text-gray-700 '> Arbit Blog </h1>
        </div>
        <div className='flex items-center '>
            <span
            onClick={() => navigate("/")}
             className='font-medium relative text-gray-700 hover:text-orange-500 transition-all duration-100 cursor-pointer hover:scale-125 '>
              <span className=' absolute text-[10px] -top-2 text-white -right-1 bg-green-700 rounded-sm px-1'>{posts.length}</span>
              Posts</span>
            <AiFillBell className=' text-gray-500 text-lg ml-2 md:ml-4  hover:text-orange-500 transition-all duration-100 cursor-pointer hover:scale-125 ' />
            <RiAppsFill className='text-gray-500 text-lg ml-2 md:ml-4 hover:text-orange-500 transition-all duration-100 cursor-pointer hover:scale-125 ' />
            <img src="/me.jpg" alt="" className='h-6 w-6 rounded-full ml-2 md:ml-4'/>
        </div>
    </div>
  )
}

export default Navbar