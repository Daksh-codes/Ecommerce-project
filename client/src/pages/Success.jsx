import React from 'react'
import { Link } from 'react-router-dom'
import correctIcon from '../assets/correct.png'
function Success() {
  return (
    <div className="flex items-center justify-center h-[50vh]">
      <div className='flex flex-col items-center md:gap-4'>
        <img src={correctIcon} alt="payment successfull" className='md:w-20 w-10' />
        <h1 className='text-xl font-semibold'>Your order Placed successfully</h1>
        <p className='text-gray-700'>To continue shopping click on <Link to="/" className="font-semibold underline"> Home</Link></p>
      </div>
    </div>
  )
}

export default Success