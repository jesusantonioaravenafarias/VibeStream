import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Row from './components/Row';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useMovies } from './hooks/useMovies';
import { AuthProvider, useAuth } from './hooks/useAuth';

const HomePage = () => {
    const { movies } = useMovies('/trending');
    const featuredMovie = movies[Math.floor(Math.random() * movies.length)];

    return (
        <>
            <Navbar />
            <Hero movie={featuredMovie} />
            <div className="rows-container" style={{ width: '100%', marginTop: '-150px', position: 'relative', zIndex: '20' }}>
                <Row title="Tendencias de la semana" endpoint="/trending" isLargeRow />
                <Row title="Populares" endpoint="/trending" />
                <Row title="Lo más visto" endpoint="/trending" />
            </div>
        </>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    )
}

export default App
