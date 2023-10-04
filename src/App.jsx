import './App.css'
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects/Projects'
import Inspiration from './components/Inspiration/Inspiration'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer'
import AnimatedBg from './components/AnimatedBg'
import RevealAnimation from './components/RevealAnimation'
import ScrollToTop from './components/ScrollToTop'
import NavHamburger from './components/Navbar/NavHamburger'


function App() {

  return (
    <div>
      <AnimatedBg />
      <ScrollToTop />
      <NavHamburger />
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
