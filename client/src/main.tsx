import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Toaster } from 'react-hot-toast';
// import { UserContext } from './utils'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <UserContext> */}
    <App />
    <Toaster />
    {/* </UserContext> */}
  </React.StrictMode>,
)
