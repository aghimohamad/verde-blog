import React from 'react'

function CommentCard({comment}) {
  return (
    <div className='w-full bg-white rounded-md mb-2 shadow-lg p-4'>
        <h1 className='font-bold mb-3'><span className='p-1 bg-orange-100 rounded-md'>name:</span>  {comment.name}</h1>
        <h1 className='mb-3'><span className='p-1 bg-red-100 rounded-md'>Email:</span>    {comment.email}</h1>
        <p className='text-[#888]'>{comment.body}</p>

    </div>
  )
}

export default CommentCard