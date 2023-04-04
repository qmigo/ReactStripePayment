import { Link, Route, Routes } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";

import '@/App.css'
import Navbar from '@/components/Navbar/Navbar'
import Failure from '@/pages/Failure/Failure'
import Payment from '@/pages/Cart/Payment'
import Success from '@/pages/Success/Success'
import Register from '@/pages/Register/Register'
import Login from '@/pages/Login/Login'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import {addToCart} from '@/slice/cartSlice'
import Product from '@/pages/Product/Product';
import Products from '@/pages/Products/Products';
import Home from '@/pages/Home/Home';


function App() {
  const userId = useSelector(state=> state.auth.id)
  
  const dispatch = useDispatch()
  useEffect(()=>{
    async function setCartSliceByDB(){
      try {
        if(!userId)return
        const {data} = await axios.get(`${process.env.URL}/getCart?userId=${userId}`)
        data.cart.map(({_id:id, name, img, price, qty, desc})=>{
          dispatch(addToCart({
            id, name, img, price, qty, desc
          }))
        })
      } catch (error) {
        console.log(error)
      }
    }
    setCartSliceByDB()
  },[])
  return (
   <div className='app'>
    <ToastContainer autoClose={5000}
      position="top-right"
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={true}
      theme="light"
      />
    <Navbar></Navbar>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/search' element={<Products></Products>}></Route>
      <Route path='/auth/login' element={<Login/>}></Route>
      <Route path='/auth/register' element={<Register/>}></Route>
      <Route path='/product/:productId' element={<Product/>}></Route>
      <Route path='/payment-success' element={<Success/>}></Route>
      <Route path='/payment-failure' element={<Failure/>}></Route>
    </Routes>
   </div>
  )
}

export default App
