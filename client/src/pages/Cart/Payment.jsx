import React, { useState, useEffect } from 'react'
import { genSalt, hash } from 'bcryptjs';

import Card from '@/components/Card/Card'
import '@/pages/Cart/Payment.css'
import { AiOutlinePlus} from 'react-icons/ai#AiOutlinePlus';
import { AiOutlineMinus} from 'react-icons/ai#AiOutlineMinus';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { incItemQty, decItemQty } from '@/slice/cartSlice';
import { v4 as uuidv4 } from 'uuid'

const hashSessionId = async (sessionId)=>{
  const salt = await genSalt(10)
  const sessionIdHashed = await hash(sessionId, salt)
  return sessionIdHashed
}

const Payment = () => {
  const cart = useSelector((state)=> state.cart.cart)
  const userId = useSelector(state=> state.auth.id)

  console.log(cart)

  const dispatch = useDispatch()

  const [totalAmt, setTotalAmt] = useState(0)
  const [products, setProducts] = useState([])
  const [isCartUpdateLoading, setIsCartUpdateLoading] = useState(false)

  useEffect(()=>{
    let sum = 0
    cart.map(({price,qty})=>sum+=price*qty)
    setTotalAmt(sum)

  },[cart])

  useEffect(()=>{
    async function getAllProducts()
    {
      try {
        const {data} = await axios.get(`${process.env.URL}/admin/getAllProducts`)
        setProducts(data.products)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    getAllProducts()
  },[])

  async function checkout(){
    console.log(cart)
    const sessionId = uuidv4()
    const sessionIdHashed = await hashSessionId(sessionId)
    console.log(sessionId, sessionIdHashed)
    sessionStorage.setItem('sessionId', sessionIdHashed)
    try {
      const {data} = await axios.post(`${process.env.URL}/checkout`,{
      cart,
      sessionId
      })
      window.location.replace(`${data.url}`);
    } catch (error) {
      alert("Sorry Service down")
    }
  }

  const handleCartUpdate = async(item,step)=>{
    setIsCartUpdateLoading(true)
    if(step===1)
    { 
      try {
        const qty = item.qty+1
        await axios.patch(`${process.env.URL}/updateCart?userId=${userId}&productId=${item.id}&quantity=${qty}`)
        dispatch(incItemQty(item.id))
      } catch (error) {
        console.log(error)
        alert('Cant update cart')
      }
    }

    else 
    {
      try {
        const qty = item.qty-1
        if(qty)
        await axios.patch(`${process.env.URL}/updateCart?userId=${userId}&productId=${item.id}&quantity=${qty}`)
        else 
        await axios.delete(`${process.env.URL}/removeFromCart?userId=${userId}&productId=${item.id}`)
        dispatch(decItemQty(item.id))
      } catch (error) {
        console.log(error)
        alert('Cant update cart')
      }
    }
    setIsCartUpdateLoading(false)
  }

  return (
    <div className="container-fluid p-10">
    <div className="payment">
      <div className="card-container">
      {
        products.length>0 ? products.map(({_id:id, title, brand, price,stars, ratings, profile},index)=>(
          <Card key={index} id={id} title={title} profile={profile} price={price} brand={brand} stars={stars} ratings={ratings}/>
        )): <>
        <h1>
        Loading Products
        </h1>
        </>
      }
      </div>
    </div>
    <h1 className='my-3'>Your's Cart</h1>
    <table className="table cart-table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Profile</th>
          <th scope="col">Price</th>
          <th scope="col">Qty</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>
        {
          
          cart.length>0 ? cart.slice(0).reverse().map((item, index)=>(
            item.qty>0?
            <tr key={index} className={isCartUpdateLoading?"hide":"show"}>
              <th scope='row'>{index+1}</th>
              <td>{item.name}</td>
              <td><img src={item.img} alt={item.name} className='thumbnail'/></td>
              <td>Rs. {item.price}</td>
              <td className='special'><AiOutlineMinus className='mr' onClick={()=>{ !isCartUpdateLoading && handleCartUpdate(item,-1)}}/> {item.qty} <AiOutlinePlus className='ml' onClick={()=>{handleCartUpdate(item,1)}}/> </td>
              <td>{item.qty*item.price}</td>
            </tr>:<></>
          ))
          
          :<tr>
            <th className='d-flex justify-content-center align-items-center'>Add items to cart !!!</th>
          </tr>
        }
      </tbody>
    </table>
    {
      totalAmt>0?<h1 className='bill-amount'>Your Total Amount : Rs. {totalAmt}</h1>:""
    }
    <div className="checkout-container">
      <button className='checkout-btn' onClick={checkout}>Proceed to Checkout</button>
    </div>

    </div>

  )
}

export default Payment
