import React from 'react'
import axios from 'axios'
import {  toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const navigate = useNavigate()
  const handleRegister = async(e)=>{
    e.preventDefault()
    try {
      const {data} = await axios.post(`${process.env.URL}/auth/register`,{
        username: e.target[0].value,
        password: e.target[1].value
      })
      toast('User Created Successfully')
      navigate('/auth/login')
    } catch (error) {
      toast(error.response.data.msg)
      console.log(error.response.data.msg) 
    }
  }
  return (
    <div className="register d-flex flex-column w-25 mx-auto">
      <div className="register-left-hero">
        
      </div>
      <form onSubmit={handleRegister} className='d-flex flex-column w-100'>
        <input type="text" placeholder='username' className='mx-2 my-2' name='username' required/>
        <input type="text" placeholder='password' className='mx-2 my-2' name='password' required/>
        <button type="submit" className='btn btn-success w-10 mx-auto'>Register</button>
      </form>
    </div>
  )
}

export default Register
