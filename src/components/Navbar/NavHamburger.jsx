import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-scroll'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { SidebarData } from './SidebarData';

export default function NavHamburger() {
    const [sidebar, setSidebar] =useState(false)
    const menuRef = useRef()
    
    const showSidebar = () => setSidebar(!sidebar)
    // Close hamburger menu when clicking outside of menu
    useEffect(() => {
        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setSidebar(false)
            }
        }
        document.addEventListener("mousedown", handler)
        
        return () => {
            document.removeEventListener("mousedown", handler)
        }
    })

  return (
    <>
        <div className="fixed hamburger top-5 left-5 cursor-pointer lg:hidden block">
            <MenuIcon onClick={showSidebar} fontSize="large" className="hover:text-code-green" />
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"} ref={menuRef}>
            <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                    <CloseIcon fontSize="large" className="ml-5 cursor-pointer hover:text-code-green" />
                </li>
                {SidebarData.map((item, index) => {
                    return (
                        <li key={index} className="nav-text cursor-pointer">
                            <Link 
                            activeClass="active" 
                            smooth spy to={item.scrollId} 
                            className="text-white hover:text-white hover:bg-code-green"
                            onClick={showSidebar}
                            >
                                {item.section}
                            </Link>
                        </li>
                    )  
                })}
            </ul>
        </nav>
    </>
  )
}