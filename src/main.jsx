import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import { store, persistor } from './store'
import { Provider } from 'react-redux'
import { RouterProvider, Route } from 'react-router-dom'
import routes from './routes.jsx'
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={routes} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)


