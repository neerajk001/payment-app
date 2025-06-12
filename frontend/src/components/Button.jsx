import React from 'react'

const Button = ({label, onClick}) => {
  return (
    <div className='mt-4 flex'>
        <button onClick={onClick} 
         type='button' className='w-full bg-blue-700 hover:bg-blue-900 py-1 px-1.5 text-white rounded text-md hover:cursor-pointer'>
            {label}
        </button>
    </div>
  )
}

export default Button