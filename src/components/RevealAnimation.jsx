import React, { useEffect } from 'react';

export default function RevealAnimation() {
    useEffect(() => {
        function reveal() {
            let elements = document.querySelectorAll(".reveal"); // Use a general selector
        
            elements.forEach((element) => {
                let windowHeight = window.innerHeight;
                let elementTop = element.getBoundingClientRect().top;
                let elementVisible = 150;
        
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add("active");
                } else {
                    element.classList.remove("active");
                }
            });
        }
        
        window.addEventListener("scroll", reveal);

        // Clean up event listener when the component unmounts
        return () => {
            window.removeEventListener("scroll", reveal);
        };
    }, []);

    return <div></div>;
}
