import React from 'react'
import ReactDOM from 'react-dom/client'

import '@/App.css'
import App from '@/App'
import { configureStore } from '@reduxjs/toolkit'
import { HashRouter as Router } from 'react-router-dom'
import cartReducer from './slice/cartSlice'
import { Provider } from 'react-redux'

const store = configureStore({
  reducer: {
    cart: cartReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
)
