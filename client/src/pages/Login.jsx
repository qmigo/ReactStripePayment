import React from 'react'
import axios from 'axios'
import {  toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '@/slice/authSlice'
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = async(e)=>{
    e.preventDefault()
    try {
      const {data} = await axios.post(`${process.env.URL}/auth/login`,{
        username: e.target[0].value,
        password: e.target[1].value
      })
      console.log(data)
      dispatch(loginUser({
        username: data.user.username,
        id: data.user._id
      }))
      toast('Login Successful')
      navigate('/')
    } catch (error) {
      console.log(error)
      toast(error.response.data.msg)
      console.log(error.response.data.msg) 
    }
  }
  return (
    <div className="login d-flex flex-column w-25 mx-auto">
      <form onSubmit={handleLogin} className='d-flex flex-column w-100'>
        <input type="text" placeholder='username' className='mx-2 my-2' name='username' required/>
        <input type="text" placeholder='password' className='mx-2 my-2' name='password' required/>
        <button type="submit" className='btn btn-success w-10 mx-auto'> Login</button>
      </form>
    </div>
  )
}

export default Login
