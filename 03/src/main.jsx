import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import QuizContextProvider from "./state/QuizContextProvider";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QuizContextProvider>
      <App />
    </QuizContextProvider>
  </React.StrictMode>,
)
