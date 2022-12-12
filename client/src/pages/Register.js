import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/UseAuth';
import moment from 'moment';
import axios from 'axios';
import PaymentGateway from '../Components/PaymentGateway';
function Register() {
  let navigate = useNavigate();
  const [userId, setUserId] = useState('')
  const [data, setData] = useState({
    avatar: '',
    name: '',
    email: '',
    password: '',
    batch: '',
    dob: '',
    phoneNo: '',
    gender: ''
  })
  const [avatar, setAvatar] = useState('')

  const batches = [
    {value: '', text: '--Choose an option--'}, 
    {value: '6-7AM', text: '6-7AM'},
    {value: '7-8AM', text: '7-8AM'},
    {value: '8-9AM', text: '8-9AM'},
    {value: '5-6PM', text: '5-6PM'},
  ];
  const genderOption = [
    {value: '', text: '--Choose an option--'},
    {value: 'Male', text: 'Male'},
    {value: 'Female', text: 'Female'},
    
  ];

  const handleChange = ({currentTarget: input}) => {
    setData({ ...data, [input.name]: input.value})
  }
  const {accessToken, user, CompletePayment, LoginFun, RegisterFun } = useAuth()

  function validateEmail(email) {
    var re = /^\S+@\S+\.\S+/;
    return re.test(email);
  }

  const calculateAge = (birthday) => {
    const startDate = new Date();
    const endDate = new Date(birthday);
    return moment.duration(startDate - endDate).years()
  }
  const changeAvatar = async(e) => {
    e.preventDefault()
    try {
        const file = e.target.files[0]
        if(!file) return alert("No files Selected")
        if(file.size > 1024 * 1024)
            return alert("Flie Size too large.")
        if(file.type !== 'image/jpeg' && file.type !== 'image/png')
            return alert("File format is incorrect.")
        let formData =  new FormData()
        formData.append('file', file)
        
        const res = await axios.post(`${process.env.REACT_APP_API}/upload_avatar`, formData, {
            headers: {'content-type': 'multipart/form-data', Authorization: accessToken}
        })
        setAvatar(res.data.url)
        setData({...data, avatar:res.data.url})

    } catch (err) {
      let errMsg = err?.response?.data?.msg
      if(errMsg){
        alert(errMsg)
      }
    }
  }
  const submitBtn = async () => {
    const age = calculateAge(data.dob)
    console.log("Age: ",age)
    if(!validateEmail(data.email)){
      alert("Enter Valid Email")
    }else if(data.password.length < 6){
      alert("Password must be atleast 6 characters")
    }else if(age < 18 || age > 65){
      alert("Age Limit is 18-65")
    }else if(!data.name || !data.batch || !data.phoneNo || !data.gender){
      alert("Fill all fields")
    }else if(data.phoneNo.length !== 10){
      alert("Enter Valid Contact No")
    }else if(!data.avatar){
      alert("Upload Photo")
    }else{
      let tid = await RegisterFun(data.avatar, data.name, data.email.toLowerCase(), data.password, data.gender, data.dob, data.phoneNo)
      setUserId(tid)
      setShowPaymentScreen(true)
    }
  }
  const[showPaymentScreen, setShowPaymentScreen] = useState(false)
  const cmptPay = (status) => {
    setShowPaymentScreen(false)
    console.log("Register-cmptPay: ", userId)
    CompletePayment(data.batch, status, userId, data.name)
  }

  return (
    <div className='h-full flex flex-col p-5'>
      {showPaymentScreen && (
        <PaymentGateway cmptPay={cmptPay}/>
      )}
      <h1 className='text-3xl font-semibold py-5 text-secondary text-center'>
        Register
      </h1>
      <div className='flex flex-col items-center'>
        {/* avatar */}
        <div className="flex flex-col items-center">
            {(avatar || user?.avatar) && (
              <img src={avatar ? avatar : user?.avatar} alt="" className='h-32 w-32 rounded-full' />
            )}
            <p>Profile Photo</p>
            <input type="file" name="file" id="file_up" onChange={changeAvatar} className="w-64" />
        </div>
        <div className='input-div-gpk'>
          <h3 className='label-gpk'>Name</h3>
          <input type="text" className='input-gpk' name='name'
             value={data.name} placeholder='Enter Name' onChange={handleChange}/>
        </div>
        <div className='input-div-gpk'>
          <h3 className='label-gpk'>Email</h3>
          <input type="text" className='input-gpk' name='email'
             value={data.email} placeholder='Enter Email' onChange={handleChange}/>
        </div>
        <div className='input-div-gpk'>
          <h3 className='label-gpk'>Password</h3>
          <input type="password" className='input-gpk' placeholder='Enter Password'
            name='password' value={data.password}  onChange={handleChange}/>
        </div>
        <div className='input-div-gpk'>
          <h3 className='label-gpk'>Gender</h3>
          <select value={data.gender} name='gender' onChange={handleChange} className='input-gpk'>
                {genderOption.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
            </select>
        </div>
        <div className='input-div-gpk'>
          <h3 className='label-gpk'>Batch</h3>
             <select value={data.batch} name='batch' onChange={handleChange} className='input-gpk'>
                {batches.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
            </select>
        </div>
        <div className='input-div-gpk'>
          <h3 className='label-gpk'>Date of Birth</h3>
          <input type="date" className='input-gpk' placeholder='Enter DOB' max={new Date()}
            name='dob' value={data.dob}  onChange={handleChange}/>
        </div>
        <div className='input-div-gpk'>
          <h3 className='label-gpk'>Contact Number</h3>
          <input type="number" className='input-gpk' placeholder='Enter Contact Number'
            name='phoneNo' value={data.phoneNo}  onChange={handleChange}/>
        </div>
        <div className=''>
          <button className='btn-gpk' onClick={() => submitBtn()}>
            Submit
          </button>
        </div>
        <div className=''>
          <p className='text-base font-normal'>
            Already have an account ?{" "}
            <button className='underline font-medium' onClick={() => navigate('/login')}>
              Login Here
            </button> 
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register