import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Row from './components/Row';
import Footer from './components/Footer';
import MovieModal from './components/MovieModal';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import WatchPage from './pages/WatchPage';
import SearchPage from './pages/SearchPage';
import { useMovies } from './hooks/useMovies';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
    const { t } = useTranslation();
    const { movies } = useMovies('/movies/trending');
    const featuredMovie = movies[Math.floor(Math.random() * movies.length)];
    const [selectedMovie, setSelectedMovie] = useState(null);

    return (
        <main>
            <Navbar />
            <Hero movie={featuredMovie} onOpenInfo={() => setSelectedMovie(featuredMovie)} />
            {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
            <div className="rows-container" style={{ width: '100%', marginTop: '10px', position: 'relative', zIndex: '20' }}>
                <Row title={t('row_trending_week')} endpoint="/movies/trending" isLargeRow />
                <Row title={t('row_popular')} endpoint="/movies/popular" isLargeRow />
                <Row title={t('row_most_viewed')} endpoint="/movies/top-rated" isLargeRow />
                <Row title={t('nav_novedades')} endpoint="/movies/upcoming" isLargeRow />
            </div>
            <Footer />
        </main>
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
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/watch/:id" element={<WatchPage />} />
                        <Route path="/search" element={<SearchPage />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    )
}

export default App
