import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail, ShieldCheck, RefreshCw } from 'lucide-react';
import axios from 'axios';
import './AuthPages.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [showVerification, setShowVerification] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [devModeCode, setDevModeCode] = useState(null);

    const { register, setAuth } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // We use axios directly since our register hook might not support the new 2-step flow yet
            const res = await axios.post(`${API_URL}/auth/register`, { name, email, password });
            setShowVerification(true);
            if (res.data.devMode) {
                setDevModeCode('Check server logs for code (Dev Mode)');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error en el registro');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifySubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post(`${API_URL}/auth/verify-email`, { email, code: verificationCode });
            const { token, user } = res.data;

            // Log in the user immediately
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            if (setAuth) setAuth(user, token);

            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Código inválido o expirado');
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${API_URL}/auth/resend-code`, { email });
            if (res.data.devMode) {
                setDevModeCode('New code sent (Check server logs)');
            }
            alert('Nuevo código enviado a ' + email);
        } catch (err) {
            setError('Error al reencviar el código');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <button className="back-btn" onClick={() => navigate(-1)} title={t('back') || 'Atrás'}>
                <ArrowLeft size={24} />
            </button>
            <div className="auth-overlay" />

            <AnimatePresence mode="wait">
                {!showVerification ? (
                    <motion.div
                        key="register-card"
                        className="auth-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link to="/" className="auth-logo-link">
                            <h1 className="auth-logo-text">Vellix</h1>
                        </Link>
                        <h2>{t('auth_register')}</h2>
                        <form onSubmit={handleRegisterSubmit}>
                            {error && <motion.div className="error-msg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.div>}
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder={t('auth_name')}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
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
                            <button type="submit" className="auth-btn" disabled={loading}>
                                {loading ? <RefreshCw className="spin" size={20} /> : t('auth_register')}
                            </button>
                        </form>
                        <div className="auth-footer">
                            <p>
                                {t('auth_got_account')}{' '}
                                <Link to="/login">{t('auth_login')}</Link>
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="verify-card"
                        className="auth-card verify-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="verify-icon-container">
                            <Mail size={48} className="verify-icon" />
                        </div>
                        <h2>Verifica tu correo</h2>
                        <p className="verify-desc">
                            Hemos enviado un código de 6 dígitos a <br />
                            <strong>{email}</strong>
                        </p>

                        <form onSubmit={handleVerifySubmit}>
                            {error && <motion.div className="error-msg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.div>}
                            <div className="input-group verification-group">
                                <input
                                    type="text"
                                    placeholder="000000"
                                    className="verify-input"
                                    maxLength="6"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                                    required
                                    autoFocus
                                />
                            </div>
                            <button type="submit" className="auth-btn verify-btn" disabled={loading}>
                                {loading ? <RefreshCw className="spin" size={20} /> : 'Verificar Cuenta'}
                            </button>
                        </form>

                        <div className="verify-footer">
                            <button className="resend-link" onClick={handleResendCode} disabled={loading}>
                                ¿No recibiste el código? Reenviar
                            </button>
                            {devModeCode && <p className="dev-code-hint">{devModeCode}</p>}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RegisterPage;
