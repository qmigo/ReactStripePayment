import React from 'react'
import '@/components/Navbar/navbar.css'
import logo from '@/assets/logo1.png'
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineSearch} from 'react-icons/ai#AiOutlineSearch';
import { loginUser, logoutUser } from '@/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { emptyCart } from '@/slice/cartSlice';
import {IoPersonOutline} from 'react-icons/io5'
import {BsBag, BsPerson} from 'react-icons/bs'
import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';
import { RxPerson } from "react-icons/rx";

const listOfOptions = [
  {
    id: 1,
    name: "Nike Shoes"
  },
  {
    id: 2,
    name: "Adidas Jacket"
  },
  {
    id: 3,
    name: "Louis Vitton"
  },
  
]

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const username = useSelector((state)=> state.auth.username)
  const id = useSelector(state=> state.auth.id)
  const cart = useSelector(state=> state.cart.cart)
  console.log(username, id)

  const handleSearch = (text, res)=>{
    console.log(text)
    console.log(res)
  }

  const handleAuth = ()=>{
    navigate('auth/login')
  }

  const handleSelect = ()=>{
    
    navigate('/search')
  }

  return (
    
    <div className="navbar">
      <div className="nav-left">
        <div className="nav-logo">
          <img src={logo} alt="logo" onClick={()=>{navigate("/")}}/>
        </div>
        <div className="nav-category">
          <span>Men</span>
          <span>Women</span>
          <span>Kids</span>
          <span>Pets</span>
          <span>Decoratives</span>
        </div>
      </div>
      <div className="nav-right">
        <div className="nav-search">
          <div className="nav-search-component">
            <ReactSearchAutocomplete 
              className='nav-search-bar'
              items = {listOfOptions}
              onSelect={handleSelect}
              onSearch = {(e)=>{handleSearch(e)}}
              placeholder='Search for brands, products and more'
            />
          </div>
        </div>
        <div className="nav-profile">
          <span className='nav-wishlist'>
            <span><AiOutlineHeart size={"1.2rem"}/></span>
            <span>Wishlist</span> 
            </span>
          <span className='nav-bag'>
            <span><BsBag size={"1.2rem"}/></span>
            <span>Bag</span>
            </span>
          <span className='nav-person' onClick={handleAuth}>
              <span ><AiOutlineUser size={"1.3rem"}/></span>
              <span>Profile</span> 
            </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
