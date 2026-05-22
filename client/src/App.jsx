import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CelebrationPage from './pages/CelebrationPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/celebration" element={<CelebrationPage />} />
      </Routes>
    </Router>
  )
}

export default App
