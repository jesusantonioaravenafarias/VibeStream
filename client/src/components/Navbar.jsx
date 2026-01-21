import React, { useState, useEffect } from 'react';
import { Search, Bell, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { t } = useTranslation();
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
                    <img src="/logo.png" alt="Vellix" className="logo" />
                </Link>
                <ul className="nav-links">
                    <li><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>{t('nav_inicio')}</Link></li>
                    <li>{t('nav_series')}</li>
                    <li>{t('nav_peliculas')}</li>
                    <li>{t('nav_novedades')}</li>
                    <li>{t('nav_mi_lista')}</li>
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
                            <span>{t('nav_settings')}</span>
                            <hr />
                            <span onClick={logout}>{t('nav_logout')}</span>
                        </div>
                    </div>
                ) : (
                    <div className="navbar-auth-buttons">
                        <Link to="/login" className="nav-btn-login">{t('nav_login')}</Link>
                        <Link to="/register" className="nav-btn-register">{t('nav_register')}</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
