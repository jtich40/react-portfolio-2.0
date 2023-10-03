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
import AnimatedBg from './components/AnimatedBg'
import RevealAnimation from './components/RevealAnimation'
import ScrollToTop from './components/ScrollToTop'


function App() {

  return (
    <div>
      <AnimatedBg />
      <ScrollToTop />
      <Navbar />
      <Home />
      <About />
      <RevealAnimation />
      <Skills />
      <RevealAnimation />
      <Projects />
      <RevealAnimation />
      <Inspiration />
      <RevealAnimation />
      <Footer />
    </div>
  )
}

export default App
