import axios from 'axios'
import React, { useState , useEffect} from 'react'
import { useNavigate, useNavigation, useParams } from 'react-router'
import {AiOutlineArrowLeft, AiFillDelete } from "react-icons/ai"
import { BsFillPencilFill } from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux'
import { fetchPost } from '../redux/postSlice'
import { deletePost, selectPostById, updatePost } from '../redux/PostsSlice'
import {GrFormAdd} from 'react-icons/gr'
import CommentCard from '../components/CommentCard'


function Post() {

    const { id } = useParams()
    const navigate = useNavigate()

    const posts = useSelector(state => state.posts.posts)
    const post = posts?.find((s) => s.id === Number(id))
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchPost(id))
    }, []) 
    
    const [formData, setFormData] =useState({
        title : post.title, 
        body : post.body,
        id : post.id
    })
    const [edit, setEdit] = useState(false)


    const [comment , setComment] = useState(null)

    useEffect(() => {
       async function fetchComments(){
       await axios.get("https://jsonplaceholder.typicode.com/posts/1/comments").then(response => response.data).then(res => setComment(res))
       }

       fetchComments();

    }, [])
    
    
  return (
    <div className='md:w-[80%] mt-12 mx-auto bg-white rounded-md p-10'>
        <div className='flex items-center justify-between mb-12'>
        <div className='flex items-center '>
            <AiOutlineArrowLeft onClick={() => {navigate("/")}} className=' h-8 w-8 mr-3 bg-[#f5f5f5] p-1 rounded-full text-black text-xl  cursor-pointer ' />
            <span className='font-bold text-xl'>Posts</span>
        </div>
        <button
        onClick={() => {navigate('/addpost')}} className='flex items-center py-1 px-2 text-white rounded-md bg-blue-500' >
            <GrFormAdd className='text-white mr-1' />
            New post
        </button>
        </div>
         
        {post ? (
            <div key={post.id} className=""> 
                
                {edit ? (
                    <textarea type='text' name='title' value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value })}
                    className=' bg-slate-100 p-3 w-full' />
                ) : <h1 className=' font-bold text-2xl mb-12'>{formData.title}</h1>}
                {edit ? (
                    <textarea type='text' name='body' value={formData.body} onChange={(e) => setFormData({...formData, body: e.target.value })}
                    className=' bg-slate-100 p-3 w-full h-44' />
                ) : <p className='text-[#888] text-xl' >{formData.body}</p>}
                
                <div className='flex justify-end mt-10'>
                <button  className='flex items-center py-1 px-2 text-white rounded-md bg-red-400'
                onClick={() =>{
                     dispatch(deletePost({id : post.id}))
                     navigate('/')
                }} > <AiFillDelete className='text-xs mr-1'/>Delete</button>
                {edit ? (
                    <button
                    className=' flex items-center py-1 px-2 text-white rounded-md bg-green-500 ml-5 ' onClick={() => {
                        dispatch(updatePost(formData))
                        setEdit(!edit)
                    }} >save</button>
                ) : (
                    <button className=' flex items-center py-1 px-2 text-white rounded-md bg-blue-500 ml-5 '
                onClick={() => setEdit(!edit)} >
                <BsFillPencilFill className='text-white text-xs mr-1' />
                    Update
                </button>
                )}
                
                
                </div>
            </div>
            
        ) : null}
        <div className='mt-10'>
            <h1 className='font-bold bg-gray-600 text-white text-center py-2 rounded-xl mb-5'>Comments</h1>
            {comment?.map(com => (
                <CommentCard comment={com} key={com.id} />
            ))}
        </div>
    </div>
  )
}

export default Post