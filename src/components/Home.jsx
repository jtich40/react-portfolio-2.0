import React from "react";
import Typewriter from 'typewriter-effect';


export default function Home() {
    return (
    <div className="flex justify-center items-center text-center min-h-screen" id="home">
        <Typewriter onInit={typewriter => typewriter
        .typeString('<span class="md:text-7xl text-5xl">Hi, my name is Jared Tichacek</span>')
        .pauseFor(100)
        .typeString('<br><br><br>')
        .pauseFor(100)
        .typeString('<span class="md:text-4xl text-3xl">Full Stack Software Engineer | Nashville, TN</span>')
        .start()
        } 
        options={{
            delay: 75,
        }}
        />
    </div>
    )
}