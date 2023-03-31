import React, { useState, useEffect } from 'react'

import Card from '@/components/Card'
import '@/pages/Payment.css'

import { AiOutlinePlus} from 'react-icons/ai#AiOutlinePlus';
import { AiOutlineMinus} from 'react-icons/ai#AiOutlineMinus';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { incItemQty, decItemQty } from '@/slice/cartSlice';

const local = 'http://localhost:5000'
const prod = 'https://payment-tnk9.onrender.com'

const DESC = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. lorem bibo lisa fdi dino'
const products = [
  {
    id: "1",
    name: "Nike AIRFORCE 1",
    desc: DESC,
    img: 'https://firebasestorage.googleapis.com/v0/b/learning-bb090.appspot.com/o/stripe%2Fpic1.webp?alt=media&token=f40f87d2-349e-4450-a78d-d1354220c025',
    price: 12000
  },
  {
    id: "2",
    name: "Rayban Sunglasses",
    desc: DESC,
    img: 'https://firebasestorage.googleapis.com/v0/b/learning-bb090.appspot.com/o/stripe%2Fpic2.jpg?alt=media&token=6c84d445-a5ed-420f-abaa-21b872814ac2',
    price: 3000
  },
  {
    id: "3",
    name: "BOAT Rockerzz 350",
    desc: DESC,
    img: 'https://firebasestorage.googleapis.com/v0/b/learning-bb090.appspot.com/o/stripe%2Fpic3.jpg?alt=media&token=5e2d976e-319e-41bd-835b-39634dc34c99',
    price: 2000
  },
  {
    id: "4",
    name: "Apple MacBook PRO",
    desc: DESC,
    img: 'https://firebasestorage.googleapis.com/v0/b/learning-bb090.appspot.com/o/stripe%2Fpic4.jpg?alt=media&token=14ba7df7-7aa8-4af9-b7e4-c105bef69539',
    price: 80000
  }
]
const Payment = () => {
  const cart = useSelector((state)=> state.cart.cart)
  console.log(cart)

  const dispatch = useDispatch()

  const [totalAmt, setTotalAmt] = useState(0)

  useEffect(()=>{
    let sum = 0
    cart.map(({price,qty})=>sum+=price*qty)
    setTotalAmt(sum)

  },[cart])

  async function checkout(){
    console.log(cart)
    try {
      const {data} = await axios.post(`${prod}/checkout`,{
      cart
      })
      window.location.replace(`${data.url}`);
    } catch (error) {
      alert("Sorry Service down")
    }
  }
  
  return (
    <div className="container-fluid p-10">
    <div className="payment">
      <div className="card-container">
      {
        products && products.map(({id, name, img, desc, price})=>(
          <Card id={id} name={name} img={img} desc={desc} price={price} />
        ))
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
            <tr key={index}>
              <th scope='row'>{index+1}</th>
              <td>{item.name}</td>
              <td><img src={item.img} alt={item.name} className='thumbnail'/></td>
              <td>Rs. {item.price}</td>
              <td className='special'><AiOutlineMinus className="mr" onClick={()=>{dispatch(decItemQty(item.id))}}/> {item.qty}  <AiOutlinePlus className="ml" onClick={()=>{dispatch(incItemQty(item.id))}}/> </td>
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
