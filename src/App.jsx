import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects/Projects'
import Inspiration from './components/Inspiration/Inspiration'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


function App() {

  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Inspiration />
      <Footer />
    </div>
  )
}

export default App
