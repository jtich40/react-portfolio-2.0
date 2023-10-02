import React, { useEffect } from 'react'

export default function AnimatedBg() {
    useEffect(() => {
        function lines() {
            let sizeW = Math.random() * 12
            let duration = Math.random() * 3
            let e = document.createElement('div')
            e.setAttribute('class', 'circle')
            document.body.appendChild(e)
            e.style.width = 2 + sizeW + 'px'
            e.style.left = Math.random() * + innerWidth + 'px'
            e.style.animationDuration = 2 + duration + 's'
        
            
            setTimeout(function() {
                document.body.removeChild(e)
            }, 5000)
        }
        
        
        // setInterval(function() {
        //     lines()
        // }, 1000)

        const intervalId = setInterval(lines, 300)

        return () => clearInterval(intervalId)
    }, [])

  return (
    <div></div>
  )
}
