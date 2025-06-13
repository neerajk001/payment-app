import React from 'react'

const Button = ({label, onClick}) => {
  return (
    <div className='mt-4 flex'>
        <button onClick={onClick} 
         type='button' className='w-full bg-blue-700 hover:bg-blue-900 py-1.5 px-2 text-white rounded text-md hover:cursor-pointer'>
            {label}
        </button>
    </div>
  )
}

export default Button