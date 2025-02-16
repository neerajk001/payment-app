import React from 'react'

const Input = ({label, placeholder , onChange,value}) => {
  return (
    <div>
        <div className='text-sm font-medium text-left mt-2'>
        {label}
        </div>
        <input 
        value={value}
        onChange={onChange}
        type="text" 
        placeholder={placeholder} className='w-full px-2 py-1 text-center rounded border-slate-400 mt-4 bg-gray-100 text-sm' />
    </div>
  )
}

export default Input