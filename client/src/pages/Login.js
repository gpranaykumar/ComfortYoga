import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/UseAuth';

function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {LoginFun} = useAuth()
  function validateEmail(email) {
    var re = /^\S+@\S+\.\S+/;
    return re.test(email);
  }
  const submitBtn = () => {
    if(!validateEmail(email)){
      alert("Enter Valid Email Id")
    }else if(password.length < 6){
      alert("Password must be atleast 6 characters")
    }else{
      LoginFun(email, password)
    }
  }
  return (
    <div className='h-full flex flex-col p-5'>
      <h1 className='text-3xl font-semibold py-5 text-secondary text-center'>
        Login
      </h1>
      <div className='flex flex-col items-center'>
        <div className='input-div-gpk'>
          <h3 className='label-gpk'>Email</h3>
          <input type="text" className='input-gpk' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className='input-div-gpk'>
          <h3 className='label-gpk'>Password</h3>
          <input type="password" className='input-gpk' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className=''>
          <button className='btn-gpk' onClick={() => submitBtn()}>
            Submit
          </button>
        </div>
        <div className=''>
          <p className='text-base font-normal'>
            Don't have an account ?{" "}
            <button className='underline font-medium' onClick={() => navigate('/register')}>
              Register Here
            </button> 
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login