import { Link, Route, Routes } from 'react-router-dom'


import '@/App.css'
import Navbar from '@/components/Navbar'
import Failure from '@/pages/Failure'
import Payment from '@/pages/Payment'
import Success from '@/pages/Success'

function App() {
  
  return (
   <div >
    <Navbar></Navbar>
    <Routes>
      <Route path='/' element={<Payment/>}></Route>
      <Route path='/payment-success' element={<Success/>}></Route>
      <Route path='/payment-failure' element={<Failure/>}></Route>
    </Routes>
   </div>
  )
}

export default App
