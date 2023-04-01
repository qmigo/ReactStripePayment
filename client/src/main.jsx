import React from 'react'
import ReactDOM from 'react-dom/client'

import '@/App.css'
import App from '@/App'
import { HashRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store} from '@/store/store' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
)
