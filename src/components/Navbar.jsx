import React from 'react'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-full fixed navbarScroll fade">
        <div className="container">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="flex ms-auto rounded-full bg-gray-500 py-2">
                    <li className="nav-item">
                        <a className="text-black hover:text-white hover:bg-red-500 transition duration-500 nav-link hover:rounded-full rounded-full hover:py-2 py-2 px-3 " id="tab-1" href="#">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="text-black hover:text-white hover:bg-yellow-500 transition duration-500 nav-link hover:rounded-full rounded-full hover:py-2 py-2 px-3 " id="tab-2" href="#about">Skills</a>
                    </li>
                    <li className="nav-item">
                        <a className="text-black hover:text-white hover:bg-green-500 transition duration-500 nav-link hover:rounded-full rounded-full hover:py-2 py-2 px-3 " id="tab-3" href="#skills">Projects</a>
                    </li>
                    <li className="nav-item">
                        <a className="text-black hover:text-white hover:bg-blue-500 transition duration-500 nav-link hover:rounded-full rounded-full hover:py-2 py-2 px-3 " id="tab-4" href="#projects">Inspiration</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}
