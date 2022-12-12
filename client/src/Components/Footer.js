import React from 'react'

function Footer() {
  return (
    <div className='w-full text-center p-1 text-sm'>
        @{new Date().getFullYear()} All rights reserved. Developed by 
          <a className='pl-1 font-medium' href='https://www.gpranaykumar.ml/' rel='noreferrer' target={"_blank"}>
            Pranay Kumar
          </a>
      </div>
  )
}

export default Footer