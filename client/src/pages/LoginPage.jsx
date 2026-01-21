import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import AdBanner from '../components/AdBanner';
import './AuthPages.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
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
            <div className="auth-overlay" />
            <div className="auth-card">
                <h1>Vellix</h1>
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error-msg">{error}</p>}
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-btn">Entrar</button>
                </form>
                <div className="auth-footer">
                    <p>¿Nuevo en Vellix? <Link to="/register">Regístrate ahora</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
