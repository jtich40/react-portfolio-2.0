import React from 'react'
import { Link } from 'react-scroll'

export default function Navbar() {
  return (
    <nav className="fixed right-5 top-5 z-30 hidden lg:block">
        <ul className="flex ms-auto rounded-full bg-gray-500 py-2">
            <li className="nav-item">
                <Link activeClass="active" smooth spy to="about" className="text-black hover:text-white hover:bg-code-green cursor-pointer transition duration-500 nav-link hover:rounded-full rounded-full hover:py-2 py-2 px-2">About</Link>
            </li>
            <li className="nav-item">
                <Link activeClass="active" smooth spy to="skills" className="text-black hover:text-white hover:bg-code-green cursor-pointer transition duration-500 nav-link hover:rounded-full rounded-full hover:py-2 py-2 px-2">Skills</Link>
            </li>
            <li className="nav-item">
                <Link activeClass="active" smooth spy to="projects" className="text-black hover:text-white hover:bg-code-green cursor-pointer transition duration-500 nav-link hover:rounded-full rounded-full hover:py-2 py-2 px-2">Projects</Link>
            </li>
            <li className="nav-item">
                <Link activeClass="active" smooth spy to="inspiration" className="text-black hover:text-white hover:bg-code-green cursor-pointer transition duration-500 nav-link hover:rounded-full rounded-full hover:py-2 py-2 px-2">Inspiration</Link>
            </li>
        </ul>
    </nav>
  )
}

    // <nav className="navbar navbar-expand-full fixed navbarScroll ml-6 z-30 hidden lg:block">
    //     <div className="container">
    //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
    //             data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
    //             aria-label="Toggle navigation">
    //             <span className="navbar-toggler-icon"></span>
    //         </button>
    //         <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //         </div>
    //     </div>
    // </nav>