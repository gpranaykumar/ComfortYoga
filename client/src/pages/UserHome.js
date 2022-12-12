import React, { useRef, useState } from 'react'
import useAuth from '../hooks/UseAuth'
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import PaymentGateway from '../Components/PaymentGateway';
function UserHome() {
  let navigate = useNavigate();
  const {loading,user, CompletePayment, LogOut} = useAuth()
  const[showPaymentScreen, setShowPaymentScreen] = useState(false)
  const batch = useRef()
  const batches = [
    {value: '', text: '--Choose an option--'}, 
    {value: '6-7AM', text: '6-7AM'},
    {value: '7-8AM', text: '7-8AM'},
    {value: '8-9AM', text: '8-9AM'},
    {value: '5-6PM', text: '5-6PM'},
  ];
  const checkDue = (lstdate) => {
    const startDate = new Date();
    const endDate = new Date(lstdate);
    // console.log("UserHome : ", startDate.getMonth(), endDate.getMonth())
    // return moment.duration(startDate - endDate).months()
    return startDate.getMonth() === endDate.getMonth()
  }

  const SubmitPayDue = () => {
    // console.log("batch: ", batch.current.value)
    if(batch.current.value===""){
      return alert("Select Batch")
    }
    setShowPaymentScreen(true)
  }
  const cmptPay = (status) => {
    setShowPaymentScreen(false)
    CompletePayment(batch.current.value, status, user._id, user.name)
  }
  return (
    <div className=''>
      {showPaymentScreen && (
        <PaymentGateway cmptPay={cmptPay}/>
      )}
      <div className='flex flex-col justify-center items-center pb-5'>
        <img src={user?.avatar} className="rounded-full h-32 w-32 " />
        <h1 className='text-xl font-normal pt-2'>
          Welcome {user?.name}
        </h1>
        {user?.role === 1 && (
          <p className=''>Admin</p>
        )}
      </div>
      <div className={`bg-secondary text-white rounded p-5 `}>
        <div className='flex justify-between'>
          <p className=''>
            Batch: {user?.batch || "-"}
          </p>
          <p className={`${user?.status ==='Active'? 'text-green-600' : 'text-red-600' }`}>
            •{user?.status}
          </p>
        </div>
        <p className=''>
          Last Payment: { user?.lastPayment && moment(user?.lastPayment).format('MMMM Do YYYY') || "-"} 
        </p>
        <div className='flex justify-between'>

          <button className='underline text-xs text-primary' onClick={() => navigate('paymenthistory')}>
            View Payment History
          </button>
          {user?.role === 1 && (
            <button className='underline text-xs text-primary' onClick={() => navigate('allusers')}>
              View All Users
            </button>
          )}
        </div>
       
          {!checkDue(user?.lastPayment) ? (
            <div className='pt-5'>
              <div className='h-[1px] w-full bg-white'>
              </div>
              <div className='input-div-gpk'>
                <h1 className='py-2 text-red-500'>Due for This Month ₹1000</h1>
                <h3 className='pb-2'>Select Batch for This Month:</h3>
                  <select ref={batch} className='input-gpk text-black'>
                      {batches.map(option => (
                        <option key={option.value} value={option.value} >
                          {option.text}
                        </option>
                      ))}
                  </select>
              </div>
              <button className='bg-primary cust-btn ' onClick={() => SubmitPayDue()}>
                Pay Due
              </button>
            </div>
          ): (
            <div className=''>
              <p className='bg-primary cust-btn text-center'>No Dues</p>
            </div>
          )}
          <button className='cust-btn bg-red-600 text-white' onClick={() => LogOut()}>
            Log out
          </button>
      </div>
    </div>
  )
}

export default UserHome