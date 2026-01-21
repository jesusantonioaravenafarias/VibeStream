import React, { useState, useEffect } from 'react';
import { Search, Bell, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-left">
                <Link to="/">
                    <img src="/src/assets/logo.png" alt="VibeStream" className="logo" />
                </Link>
                <ul className="nav-links">
                    <li><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Inicio</Link></li>
                    <li>Series</li>
                    <li>Películas</li>
                    <li>Novedades</li>
                    <li>Mi Lista</li>
                </ul>
            </div>

            <div className="navbar-right">
                <Search className="nav-icon" />
                <Bell className="nav-icon" />
                {user ? (
                    <div className="user-profile">
                        <User className="nav-icon active-user" />
                        <div className="dropdown">
                            <span className="user-name">{user.name}</span>
                            <span>Ajustes</span>
                            <hr />
                            <span onClick={logout}>Cerrar Sesión</span>
                        </div>
                    </div>
                ) : (
                    <button className="login-nav-btn" onClick={() => navigate('/login')}>Login</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
