import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { useAuth } from './AuthContext';

const Navbar = () => {

    const { isLoggedIn, logout } = useAuth();


    return (
        <div className='nav'>
            <Link to='/' className='nav-item'>Home</Link>
            <Link to='/' className='nav-item'>About Us</Link>
            <Link to='/' className='nav-item'>Contact Us</Link>
            {isLoggedIn ? (
                <button onClick={logout} className='nav-item'>Logout</button>
            ) : (
                <Link to='/Login' className='nav-item'>Login</Link>
            )}
        </div>

    )
}

export default Navbar

