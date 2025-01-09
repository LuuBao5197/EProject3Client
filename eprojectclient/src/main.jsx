import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import myStore from './Redux/store.js';
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';
import { publicRoutes } from './routes/routes.js';
createRoot(document.getElementById('root')).render(

  <Provider store={myStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>



)
