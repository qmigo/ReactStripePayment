import React from 'react'

const Success = () => {
  setTimeout(()=>{
    window.location.replace('/');
  },3000)
  return (
    <div className='w-100 h-50 d-flex justify-content-center align-items-center flex-column'>
      <h1>Transaction Status</h1>
      <img src="https://www.architecturaldigest.in/wp-content/themes/cntraveller/images/check-circle.gif" alt="success" />
    </div>
  )
}

export default Success
