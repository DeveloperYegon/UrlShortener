import React from 'react'
import Dashboard from './Pages/Dashboard'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import About from './Pages/About'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
<BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer/>
</BrowserRouter>
     
    </div>
  )
}

export default App