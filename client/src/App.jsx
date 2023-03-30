import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Failure from './pages/failure'
import Payment from './pages/payment'
import Success from './pages/success'

function App() {
  const port = process.env.PORT
  return (
   <div className="app">
    <Routes>
      <Route path='/' element={<Payment/>}></Route>
      <Route path='/payment-success' element={<Success/>}></Route>
      <Route path='/payment-failure' element={<Failure/>}></Route>
    </Routes>
   </div>
  )
}

export default App
