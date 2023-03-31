import React, { useState } from 'react'
import '@/components/card.css'
import {addToCart as myAdd} from '../slice/cartSlice'
import { useDispatch, useSelector } from 'react-redux'

const Card = ({id, name, img, price, desc}) => {
  const dispatch = useDispatch()
  const myCart = useSelector((state)=> state.cart.cart)
  const addToCart = ()=>{
    const item = myCart.find(item=> item.id===id)
    if(!item)
    dispatch(myAdd({id, name, img, price, qty:1 }))

    else
    alert("Item already in Cart")
  }

  return (
    <div className="card">
      <div className="card-img">
      <img src={img} alt={name} />
      </div>
      <div className="card-desc">
        <h4>{name}</h4>
        <p>{desc}</p>
        <span className='card-price'>Rs. {price}</span>
      </div>
      <div className="card-cart">
        <button className='btn cart-btn' onClick={addToCart}>Add to Cart</button>
      </div>
    </div>

  )
}

export default Card
