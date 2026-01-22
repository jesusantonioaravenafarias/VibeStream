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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    // Search State
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef(null);

    // Notifications State
    const [showNotifications, setShowNotifications] = useState(false);
    const [recentMovies, setRecentMovies] = useState([]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fetch notifications (Simulated with Upcoming movies)
    useEffect(() => {
        const fetchNotifications = async () => {
            if (user) {
                try {
                    const response = await axios.get(`${API_URL}/movies/upcoming`, {
                        params: { lang: navigator.language }
                    });
                    setRecentMovies(response.data.slice(0, 5)); // Top 5
                } catch (error) {
                    console.error("Failed to fetch notifications");
                }
            }
        };
        fetchNotifications();
    }, [user]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${searchQuery}`);
            setShowSearch(false);
        }
    };

    const toggleSearch = () => {
        setShowSearch(!showSearch);
        if (!showSearch) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    };

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-left">
                    <Link to="/" className="navbar-logo">
                        <img src="/logo-vellix.png" alt="Vellix Logo" className="logo-img" />
                    </Link>
                    <div className="desktop-menu">
                        <Link to="/" className="nav-link">{t('navbar.home')}</Link>
                        <Link to="#" className="nav-link">{t('navbar.movies')}</Link>
                        <Link to="#" className="nav-link">{t('navbar.series')}</Link>
                        <Link to="#" className="nav-link">{t('navbar.new')}</Link>
                        <Link to="#" className="nav-link">{t('navbar.list')}</Link>
                    </div>
                </div>

                <div className="navbar-right">
                    {/* Search Bar */}
                    <div className={`search-box ${showSearch ? 'active' : ''}`}>
                        <button className="icon-btn search-toggle" onClick={toggleSearch}>
                            <Search size={20} />
                        </button>
                        <form onSubmit={handleSearchSubmit} className="search-form">
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder={t('navbar.movies') + "..."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onBlur={() => !searchQuery && setShowSearch(false)}
                            />
                        </form>
                    </div>

                    {/* Notifications */}
                    <div className="notification-box" style={{ position: 'relative' }}>
                        <button className="icon-btn" onClick={() => setShowNotifications(!showNotifications)}>
                            <Bell size={20} />
                            {recentMovies.length > 0 && <span className="notification-dot"></span>}
                        </button>

                        {showNotifications && (
                            <div className="notifications-dropdown">
                                <h4>Próximos Estrenos</h4>
                                {recentMovies.map(movie => (
                                    <div key={movie.id} className="notification-item" onClick={() => {
                                        navigate(`/watch/${movie.id}`, { state: { type: 'movie' } });
                                        setShowNotifications(false);
                                    }}>
                                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="" />
                                        <div className="notif-text">
                                            <p className="notif-title">{movie.title}</p>
                                            <p className="notif-date">Nuevo</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button className="icon-btn lang-btn" onClick={toggleLanguage} title="Cambiar idioma">
                        <Globe size={20} />
                        <span className="lang-code">{i18n.language?.toUpperCase().substring(0, 2)}</span>
                    </button>

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
            </div>
        </nav>
    );
};

export default Navbar;
