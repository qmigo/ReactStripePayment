import React, { useState } from 'react'
import './card.css'
import produce from 'immer'

const Card = ({id, name, img, price, desc, cart, setCart}) => {
  
  const addToCart = ()=>{

    const obj = cart.find(item => id===item.id )
    console.log(obj)
    if(!obj)
    setCart([...cart, { id, name, img, price, qty:1 }])

    else
    alert("Already in Cart")
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
