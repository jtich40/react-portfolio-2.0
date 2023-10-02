import React from 'react'
import Typewriter from 'typewriter-effect/dist/core';

export default function Typer() {
    const header = document.getElementById('header');

    var typewriter = new Typewriter(header, {
    //   loop: true,
        delay: 75,
    });

    typewriter
        .typeString('<span style="font-size: 5rem">Hi, my name is Jared Tichacek</span>')
        .pauseFor(100)
        .typeString('<br><br><br><br>')
        .pauseFor(100)
        .typeString('<span style="font-size: 2rem">Full Stack Software Engineer | Nashville, TN</span>')
        .start();

    return (
        <div id="header" className="text-center"></div>
    )
}