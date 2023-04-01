import React from 'react'
import '@/components/navbar.css'
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineSearch} from 'react-icons/ai#AiOutlineSearch';
import { loginUser, logoutUser } from '@/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { emptyCart } from '@/slice/cartSlice';
const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const username = useSelector((state)=> state.auth.username)
  const id = useSelector(state=> state.auth.id)
  console.log(username, id)

  const handleAuth = ()=>{
    navigate('auth/login')
  }

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
      
        {  username!==null?
            <>
            <span>{username} </span> 
            <span onClick={()=> {
              dispatch(logoutUser())
              dispatch(emptyCart())
              }}> Logout</span>
            </>
            :
            <span onClick={handleAuth}>
            Login
            </span>
        }
    </div>
  </nav>
  )
}

export default Navbar
