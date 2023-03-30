import React, { useState } from 'react'
import './card.css'
import produce from 'immer'

const Card = ({id, name, price, cart, setCart}) => {
  const [qty, setQty] = useState(0)

  function handleClick(amount){
    
    const temp = [{id, name, price, qty: qty+amount}]
    
    cart.map((item)=>{
      
      if(item.id!==id)
      temp.push(item)
      
    })

    
    setCart(temp)
  }

  return (
    <div className='Card'>

      <div className="name">
        Name : {name}
      </div>
      <div className="name">
        price : {price}
      </div>
      <div>{qty}</div>
      <button onClick={()=>{
        setQty((prev)=>prev+1)
        handleClick(1)
      }}>+</button>
      {
        qty>0 && 
        <button onClick={()=>{
          setQty((prev)=>prev-1)
          handleClick(-1)
        }}>-</button>
      
      }
    </div>
  )
}

export default Card
