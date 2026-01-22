import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Search, Bell, Menu, X, Globe, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, logout } = useAuth();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    // --- SEARCH STATE (Overlay Mode) ---
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef(null);

    // --- NOTIFICATION STATE (Simple Dropdown) ---
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [recentMovies, setRecentMovies] = useState([]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fetch Notifications
    useEffect(() => {
        if (user) {
            axios.get(`${API_URL}/movies/upcoming`, { params: { lang: navigator.language } })
                .then(res => setRecentMovies(res.data.slice(0, 5)))
                .catch(err => console.error(err));
        }
    }, [user]);

    // Search Handlers
    const openSearch = () => {
        setIsSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
    };

    const closeSearch = () => {
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${searchQuery}`);
            closeSearch();
        }
    };

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <>
            {/* MAIN NAVBAR */}
            <nav className={`custom-navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="nav-left">
                    <Link to="/">
                        <img src="/logo-vellix.png" alt="Logo" className="nav-logo" />
                    </Link>
                    <div className="nav-links-desktop">
                        <Link to="/">{t('navbar.home')}</Link>
                        <Link to="#">{t('navbar.movies')}</Link>
                        <Link to="#">{t('navbar.series')}</Link>
                    </div>
                </div>

                <div className="nav-right">
                    {/* BUTTONS: Explicit click handlers */}
                    <button className="nav-action-btn" onClick={openSearch} title="Buscar">
                        <Search size={22} />
                    </button>

                    <div className="notif-container">
                        <button className="nav-action-btn" onClick={() => setIsNotifOpen(!isNotifOpen)} title="Notificaciones">
                            <Bell size={22} />
                            {recentMovies.length > 0 && <span className="red-dot"></span>}
                        </button>

                        {/* Notification Dropdown */}
                        {isNotifOpen && (
                            <div className="simple-dropdown">
                                <div className="dropdown-header">Estrenos</div>
                                {recentMovies.map(m => (
                                    <div key={m.id} className="dropdown-item" onClick={() => {
                                        navigate(`/watch/${m.id}`, { state: { type: 'movie' } });
                                        setIsNotifOpen(false);
                                    }}>
                                        <span>{m.title}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button className="nav-action-btn" onClick={toggleLanguage}>
                        <Globe size={22} />
                        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', marginLeft: '4px' }}>
                            {i18n.language?.toUpperCase().substring(0, 2)}
                        </span>
                    </button>

                    {user ? (
                        <div className="profile-container">
                            <User className="nav-action-btn user-icon" onClick={() => logout()} title="Logout (Click to exit)" />
                        </div>
                    ) : (
                        <div className="auth-links">
                            <Link to="/login" className="btn-login">Login</Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* SEARCH OVERLAY (Full Screen) */}
            {isSearchOpen && (
                <div className="search-overlay">
                    <button className="close-search" onClick={closeSearch}><X size={30} /></button>
                    <form onSubmit={handleSearchSubmit} className="big-search-form">
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="¿Qué quieres ver hoy?"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                </div>
            )}
        </>
    );
};

export default Navbar;
