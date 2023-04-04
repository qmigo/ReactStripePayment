import React from 'react'

const Failure = () => {
  setTimeout(()=>{
    window.location.replace('/');
  },3000)
  return (
    <div className='w-100 h-50 d-flex justify-content-center align-items-center flex-column'>
    <h1>Transaction Status</h1>
    <img src="https://cdn.dribbble.com/users/107759/screenshots/4594246/media/26964eef6df71cc93166d45528405dbe.gif" alt="failure" />
  </div>
  )
}

export default Failure
