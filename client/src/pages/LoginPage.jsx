import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import './AuthPages.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-container">
            <button className="back-btn" onClick={() => navigate(-1)} title={t('back') || 'Atrás'}>
                <ArrowLeft size={24} />
            </button>
            <div className="auth-overlay" />
            <motion.div
                className="auth-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link to="/" className="auth-logo-link">
                    <h1 className="auth-logo-text">Vellix</h1>
                </Link>
                <h2>{t('auth_login')}</h2>
                <form onSubmit={handleSubmit}>
                    {error && (
                        <motion.div
                            className="error-msg"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            {error}
                        </motion.div>
                    )}
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder={t('auth_email')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder={t('auth_password')}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-btn">
                        {t('auth_enter')}
                    </button>
                </form>
                <div className="auth-footer">
                    <p>
                        {t('auth_no_account')}{' '}
                        <Link to="/register">{t('login_register')}</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
