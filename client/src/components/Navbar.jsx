```javascript
import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Menu, X, Globe, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './Navbar.css';

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
                    const response = await axios.get(`${ API_URL } /movies/upcoming`, {
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
            navigate(`/ search ? q = ${ searchQuery } `);
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
        <nav className={`navbar ${ isScrolled ? 'scrolled' : '' } `}>
                        <Link to="/login" className="nav-btn-login">{t('nav_login')}</Link>
                        <Link to="/register" className="nav-btn-register">{t('nav_register')}</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
