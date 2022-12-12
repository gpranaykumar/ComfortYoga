import React, { createContext, useContext, useEffect, useState } from 'react'

import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import uniqid from 'uniqid';
const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    let navigate = useNavigate();
      const [user, setUser] = useState(null) //useState(JSON.parse(localStorage.getItem('user')) || null)
      const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true'  || false)
      const [accessToken, setAccessToken] = useState('')
      const [getAccessToken, setGetAccessToken] = useState(false)
      const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshtoken') || null)
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState(false)
    
    useEffect(() => {
      setLoading(true)
      try{
        if(refreshToken){
          getAccess()
        }
      }catch(err){
        console.log("Err:", err)
        localStorage.removeItem('refreshtoken')
      }
      setLoading(false)
    }, [refreshToken, getAccessToken,isLoggedIn])
    
    const getAccess = async(ref) => {
      // console.log("getAccess: ",refreshToken, ref )
      const res = await axios.post(`${process.env.REACT_APP_API}/user/refresh_token`, {refreshtoken:refreshToken? refreshToken: ref })
      // console.log(res.data)
      setAccessToken(res.data.accessToken)
      localStorage.setItem('isLoggedIn', true)
    } 

    useEffect(() => {
      setLoading(true)
      try{
        getUserInfo()
      }catch(err){
        console.log("Error: ",err)
      }
      setLoading(false)
    }, [accessToken])
    const getUserInfo = async() => {
      setLoading(true)
      try{
          if(accessToken){

            const res = await axios.get(`${process.env.REACT_APP_API}/user/infor`,
              { 
                // withCredentials: true,
                headers: {
                  Authorization: accessToken 
                }
              })
            // console.log("GetUserInfo: ",res.data.user)
            // localStorage.setItem('user', JSON.stringify(res.data.user));
            setUser(res.data.user)
          }
      }catch(err){
        console.log("Err: ",err)
        let errMsg = err?.response?.data?.msg
          if(errMsg){
            alert(errMsg)
          }
      }
      setLoading(false)
    }


    const CompletePayment = async(batch, status, id, name) => {
      setLoading(true)
      try{
          if(id){
            const res = await axios.post(`${process.env.REACT_APP_API}/payment/add`,
                  {
                    userId: id,
                    TransactionId: uniqid(),
                    batch: batch,
                    status: status,
                    name: name
                  }
                  )
              alert(res.data.msg)
              if(status === 'success'){
                getUserInfo()
              }
              navigate("/")
        }
      }catch(err){
        console.log("Error: ", err)
        let errMsg = err?.response?.data?.msg
          if(errMsg){
            alert(errMsg)
          }
      }
      setLoading(false)
    }

    const LoginFun = async(email, password) => {
        setLoading(true)
        // console.log("ENV_API: ", process.env.REACT_APP_API)
        // console.log("Login: ",email, password)
        try{
          const res = await axios.post(`${process.env.REACT_APP_API}/user/login`, {email, password})
          // console.log("Login",res.data)
          localStorage.setItem('refreshtoken', res.data.refreshtoken)
          localStorage.setItem('isLoggedIn', true)
          await getAccess(res.data.refreshtoken)
          getUserInfo()
          setIsLoggedIn(true)
        }catch(err){
          console.log("LoginError: ", err)
          let errMsg = err?.response?.data?.msg
          if(errMsg){
            alert(errMsg)
          }
        }
        setLoading(false)
    }
    const RegisterFun = async(avatar, name, email, password, gender, dob, phoneNo) => {
      try{  
        const res = await axios.post(`${process.env.REACT_APP_API}/user/register`, {avatar, name, email, password, gender, dob, phoneNo}, )
        return res.data.resNewUser._id
      }catch(err){
        console.log("Err: ", err)
        let errMsg = err?.response?.data?.msg
          if(errMsg){
            alert(errMsg)
          }
      }
    }

    const LogOut = async() => {
      localStorage.clear();
      setIsLoggedIn(false)
      setAccessToken("")
      setRefreshToken("")
      setUser(null)
    }


    return (
        <AuthContext.Provider 
        value={
          { 
            user,
            isLoggedIn,
            loading,
            setLoading,
            error,
            setError,
            LoginFun,
            CompletePayment,
            accessToken,
            LogOut,
            setGetAccessToken,
            RegisterFun
        }
        } >
          {children}
        </AuthContext.Provider>
      )
    }
    
    export default function useAuth(){
        return useContext(AuthContext);
    }