import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login'
import './App.css'
import RiddlePage from './pages/riddle'
import { WebSocketProvider } from './wsGlobal'

function App() {
  

  return (
    <WebSocketProvider>

    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/riddle" element={<RiddlePage/>} />
      </Routes>
    </Router>
    </WebSocketProvider>
  )
}

export default App
