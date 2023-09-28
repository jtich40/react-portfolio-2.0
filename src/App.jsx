import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
import Inspiration from './components/Inspiration'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


function App() {

  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Projects />
      <Inspiration />
      <Footer />
    </div>
  )
}

export default App
