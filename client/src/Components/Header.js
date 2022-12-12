import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='w-full bg-secondary p-4 flex items-center justify-center'>
      <Link to="/">
        <h1 className='text-white text-xl font-semibold '>
          Comfort Yoga
        </h1>
      </Link>
    </div>
  )
}

export default Header