import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/App.css';
import App from './App';
import { Provider } from 'react-redux';
import myStore from './Redux/store.js';
import { BrowserRouter } from 'react-router-dom';
createRoot(document.getElementById('root')).render(

  <Provider store={myStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

