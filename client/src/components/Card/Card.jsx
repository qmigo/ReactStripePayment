import React, { useState } from 'react'
import '@/components/Card/card.css'
import {addToCart as myAdd} from '@/slice/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const Card = ({id, title, brand, price,stars, ratings, profile}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const myCart = useSelector((state)=> state.cart.cart)
  const userId= useSelector(state=> state.auth.id)
  
  const viewDetails = ()=>{
    navigate(`/product/${id}`)
  }

  const addToCart = async()=>{
    if(!userId)
    return alert('Login First')
    const item = myCart.find(item=> item.id===id)
    if(!item)
    { 
      try {
        const {data} = await axios.post(`${process.env.URL}/addToCart`,{
          userId,
          productId:id
        })
        dispatch(myAdd({id, name, img, price, qty:1 }))
      } catch (error) {
        console.log(error)  
      }
    }

    else
    alert("Item already in Cart")
  }

  return (
    <div className="card" onClick={viewDetails}>
      <div className="card-img">
      <img src={profile[0].urls[0]} alt={title}/>
      </div>
      <div className="card-desc">
        <h4>{title}</h4>
        <span className='card-price'>Rs. {price}</span>
      </div>
      <div className="card-cart">
        <button className='btn cart-btn' onClick={addToCart}>Add to Cart</button>
      </div>
    </div>

  )
}

export default Card
