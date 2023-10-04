import React, { useState, useEffect } from 'react'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

export default function ScrollToTop() {
    const [showScrollTopButton, setShowScrollTopButton] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 300) {
                setShowScrollTopButton(true)
            } else {
                setShowScrollTopButton(false)
            }
        })
    }, [])

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
  return (
    <div>
       {showScrollTopButton && (
       <KeyboardDoubleArrowUpIcon 
       className="fixed bottom-7 right-7 cursor-pointer z-40 h-10 w-10 rounded-full bg-code-green text-black hover:text-white hover:bg-black transition duration-500"
       fontSize="large"
       onClick={scrollTop} />
       )}
    </div>
  )
}