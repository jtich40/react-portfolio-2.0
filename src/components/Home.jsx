import React from "react";
import Typewriter from 'typewriter-effect';


export default function Home() {
    return (
    <div className="flex justify-center items-center text-center min-h-screen" id="home">
        <Typewriter onInit={typewriter => typewriter
        .typeString('<span style="font-size: 5rem">Hi, my name is Jared Tichacek</span>')
        .pauseFor(100)
        .typeString('<br><br>')
        .pauseFor(100)
        .typeString('<span style="font-size: 2.5rem">Full Stack Software Engineer | Nashville, TN</span>')
        .start()
        } 
        options={{
            delay: 75,
        }}
        />
    </div>
    )
}

            // <div className="mb-24">
            //     <h1 className="text-6xl text-center">Hi, my name is Jared Tichacek</h1>
            //     <p className="text-3xl mt-8 text-center">Full Stack Software Engineer | Nashville, TN</p>
            // </div>