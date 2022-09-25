import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { addNewPost } from '../redux/PostsSlice'

function Addpost() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData , setFormData ] = useState({})

  return (
    <div className='md:w-[80%] mt-12 mx-auto bg-white rounded-md p-10'>
        <label htmlFor="title" >Title :</label>
          <textarea type='text' name='title' value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value })}
                    className=' bg-slate-100 p-3 w-full mb-9' />
        <label htmlFor="body">Details:</label>
        <textarea type='text' name='body' value={formData.body} onChange={(e) => setFormData({...formData, body: e.target.value })}
                    className=' bg-slate-100 p-3 w-full h-44' />
       <div className='flex justify-between'>
       <button 
       onClick={() => navigate('/')}
       className='flex items-center py-1 px-2 text-white rounded-md bg-red-500  justify-center  '>Cancel</button>
       <button
        onClick={() => {
           if (formData.title  && formData.body  ){
            dispatch(addNewPost(formData))
            navigate('/')
           }
           else {
            alert('type something')
           }
        }}  className=' flex items-center py-1 px-2 text-white rounded-md bg-green-500  justify-center w-16 '>Add</button>
       </div>
    </div>
  )
}

export default Addpost