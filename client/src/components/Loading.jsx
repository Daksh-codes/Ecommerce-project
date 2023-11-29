import React from 'react'
import loadingIcon from "../assets/loading.jpg"
function Loading() {
  return (
    <div className='flex items-center justify-center h-[80vh]'>
        <img src={loadingIcon} alt="loading" className='animate-spin w-52' />
    </div>
    
  )
}

export default Loading