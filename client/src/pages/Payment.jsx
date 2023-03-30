import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import Card from '../components/Card'
import './Payment.css'
import axios from 'axios'


const Payment = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])

  useEffect(() => {
    
  }, [])
  

  async function checkout(){
    console.log('click')
    const {data} = await axios.post("http://localhost:5000/checkout",{
    cart
    })
    console.log(data)
    window.location.replace(`${data.url}`);

  }

  return (
    <div className="container">
    <div className="payment">
      <Card id={1} name="A" price={100} cart={cart} setCart={setCart}/>
      <Card id={2} name="B" price={200} cart={cart} setCart={setCart}/>
      <Card id={3} name="C" price={300} cart={cart} setCart={setCart}/>
      <Card id={4} name="D" price={400} cart={cart} setCart={setCart}/>
      <button onClick={checkout}>Checkout</button>
    </div>
    <div className="cart">
      <h1>Cart</h1>
      {
        cart.length && cart.map((item, index)=>(

          item.qty>0?<div key={index}>{item.id} | {item.name} - {item.price} ? {item.qty}</div>:" "
        ))
      }
    </div>
    </div>

  )
}

export default Payment
