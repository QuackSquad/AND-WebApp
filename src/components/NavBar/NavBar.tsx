import {  } from 'react'
import './NavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/" className="logo">
                AND
                </a>
            </div>
            <div className="navbar-center">
                <ul className="nav-links">
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/page">Page</a>
                </li>
                </ul>
            </div>
            <div className="navbar-right">
                <a href="/account" className="user-icon">
                    <FontAwesomeIcon icon={faUser} size="2x" />
                </a>
            </div>
        </nav>
    )
}

export default NavBar