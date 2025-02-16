import React from 'react'
import { Link } from 'react-router-dom'

const BottomWarning = ({label, buttonText, to}) => {
  return (
    <>
   <div className='flex justify-center py-2 text-center items-center'>
   <div className='text-sm text-gray-400'>
        {label}
    </div>
    <div>
        <Link className='underline text-sm pl-2 hover:text-blue-500 ' to={to}>
        {buttonText}
        </Link>
    </div>
   </div>
    </>
  )
}

export default BottomWarning