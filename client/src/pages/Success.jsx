import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { compare } from 'bcryptjs'
import {emptyCart} from'@/slice/cartSlice'

import axios from 'axios'

const addTransactionToDB = async(userId, navigate, dispatch)=>{
  try {
    console.log(userId)
    const {data} = await axios.get(`${process.env.URL}/getCart?userId=${userId}`)
    
    // console.log(data)
    const sale = data.cart.map((item)=>{
      return {
        productId: item._id,
        qty: item.qty,
        price: item.price
      }
    })  
    // console.log(sale)
    const {data:transaction} = await axios.post(`${process.env.URL}/addTransaction`,{
      sale,
      userId
    })
    await axios.get(`${process.env.URL}/clearCart?userId=${userId}`)
    dispatch(emptyCart())
    // console.log(transaction)
    toast('Transaction Succesfull')
    navigate('/')
  } catch (error) {
    console.log(error)
    alert('payment was successful but our server went down, kindly contact our helpline')
  }
}

const compareSessionId = async(id, hashedId, navigate, setIsSessionValid, userId, dispatch)=>
{
  console.log(id, hashedId)
  const isSessionValid = await compare(id, hashedId)
  console.log(isSessionValid)
  setIsSessionValid(isSessionValid)

  if(isSessionValid)
    { 
      // hit endpoint
      sessionStorage.removeItem('sessionId')
      addTransactionToDB(userId, navigate, dispatch)
    }
    else{
      toast('Session Expired')
      navigate('/')
    }
}



const Success = () => {

  const [isSessionValid, setIsSessionValid] = useState(null)
  const {id:userId} = useSelector(state=> state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(()=>{
    const sessionId = sessionStorage.getItem('sessionId')
    const queryParameters = new URLSearchParams(window.location.search)
    const redirectSessionId = queryParameters.get("sessionId")
    if(sessionId)
    compareSessionId(redirectSessionId, sessionId, navigate, setIsSessionValid,userId, dispatch)
    else{
      toast('Session Expired')
      navigate('/')
    }
  },[])
    
  return (
    <div>
        {isSessionValid===null && 
        <div>
          <h1>
          Loading
          </h1>
        </div>
        }
        {  
        isSessionValid===true && 
          <div className='w-100 h-50 d-flex justify-content-center align-items-center flex-column'>
            <h1>Transaction Status</h1>
            <img src="https://www.architecturaldigest.in/wp-content/themes/cntraveller/images/check-circle.gif" alt="success" />
          </div>
        }
        {
        isSessionValid===false &&
          <div >
            <h1>Session Expired. You will be redirected to dashboard soon</h1>
          </div>
        }
        
    </div>
  )
}

export default Success
