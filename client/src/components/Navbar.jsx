import React from 'react'
import '@/components/navbar.css'
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineSearch} from 'react-icons/ai#AiOutlineSearch';
import { loginUser, logoutUser } from '@/slice/authSlice';

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.auth.user)
  console.log(user)

  const handleAuth = ()=>{
    console.log(';click')
    dispatch(loginUser("ankur"))
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
      
        {  user!==null?
            <>
            <span>{user} </span> 
            <span onClick={()=> {dispatch(logoutUser())}}> Logout</span>
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
