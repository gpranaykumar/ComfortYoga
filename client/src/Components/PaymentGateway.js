import React from 'react'

function PaymentGateway({cmptPay}) {
  return (
    <div className='absolute p-5 top-0 left-0 h-full w-full bg-white/50 flex items-cener justify-center'>
            <div className='  p-5 flex flex-col justify-center items-center'>
              <div className='bg-white flex flex-col justify-center items-center p-5 rounded'>
                <h1 className='text-xl font-bold'>
                  Payment Gateway
                </h1>
                <p className=''>
                  Make ₹500 Payment ?
                </p>
                <button className='cust-btn bg-green-500 text-white' onClick={() => cmptPay("success")}>
                  Success
                </button>
                <button className='cust-btn bg-red-400 text-white'onClick={() => cmptPay("decline")}>
                  Decline
                </button>
              </div>
            </div>
        </div>
  )
}

export default PaymentGateway