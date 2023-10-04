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