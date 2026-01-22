import React from 'react';
import { Mail, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section brand">
                    <img src="/logo.png" alt="Vellix" className="footer-logo" />
                    <p className="footer-tagline">
                        {t('footer_tagline') || 'Premium streaming for the digital era.'}
                    </p>
                </div>

                <div className="footer-section links">
                    <h3>{t('footer_explore') || 'Explore'}</h3>
                    <ul>
                        <li><Link to="/">{t('nav_inicio')}</Link></li>
                        <li><Link to="/">{t('nav_peliculas')}</Link></li>
                        <li><Link to="/">{t('nav_series')}</Link></li>
                    </ul>
                </div>

                <div className="footer-section contact">
                    <h3>{t('footer_contact') || 'Contact'}</h3>
                    <div className="contact-item">
                        <Mail size={16} />
                        <a href="mailto:vellixoficial@gmail.com" className="footer-email">vellixoficial@gmail.com</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {currentYear} Vellix. {t('footer_rights') || 'All rights reserved.'}</p>
                <div className="footer-legal">
                    <Link to="/privacy">{t('footer_privacy') || 'Privacy Policy'}</Link>
                    <Link to="/terms">{t('footer_terms') || 'Terms of Use'}</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
