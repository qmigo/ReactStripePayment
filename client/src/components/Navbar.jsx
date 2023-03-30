import React from 'react'
import '@/components/navbar.css'

import { AiOutlineSearch} from 'react-icons/ai#AiOutlineSearch';

const Navbar = () => {
  return (
  <nav className='navbar'>
    <div className="nav-logo mx-5 my-2 display-6 w-35">
      <span className='nav-img'>Cart-ends</span>
    </div>
  
    <div className="nav-tools w-50">
      <span>Products</span>
      <span>About</span>
      <span>Contact</span>
      <span>Feedback</span>
      <span className='search-holder'>
        <input type="text" placeholder='Search ...'/>
        <AiOutlineSearch/>
      </span>
      <span>Login</span>
    </div>
  </nav>
  )
}

export default Navbar
