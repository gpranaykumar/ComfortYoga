import React from 'react'
import { useNavigate } from 'react-router-dom';
import Meditation from '../assets/Meditation.svg'

function Home() {
    let navigate = useNavigate();
  return (
        <div className='h-full flex flex-col md:justify-center'>
            <h1 className='text-5xl lg:text-7xl font-semibold text-secondary'>
                Clam Mind <br/> Strong Mind
            </h1>
            <h3 className='text-xl text-end'>
                Just For ₹1000 
            </h3>
            <div className='py-4 '>
                <button className='p-2 px-4 mx-2 bg-secondary  rounded text-white trans-gpk hover:-translate-y-1 hover:scale-105'
                    onClick={() => navigate('login')}>
                    Login
                </button>
                <button className='p-2 px-4 mx-2 bg-[#a1cc34]  rounded text-secondary trans-gpk hover:-translate-y-1 hover:scale-105'
                    onClick={() => navigate('register')}>
                    Register
                </button>
            </div>
        </div>
    
  )
}

export default Home