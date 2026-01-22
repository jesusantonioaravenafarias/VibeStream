import React from 'react';
import { Play, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = ({ movie }) => {
    const navigate = useNavigate();
    if (!movie) return <div className="hero-placeholder" />;

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    };

    return (
        <header
            className="hero"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 30%, var(--bg-color) 100%), url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center'
            }}
        >
            <motion.div
                className="hero-contents"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h1 className="hero-title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className="hero-buttons">
                    <button className="hero-button play" onClick={() => navigate(`/watch/${movie.id}`, { state: { type: movie.media_type || 'movie' } })}>
                        <Play size={20} fill="currentColor" /> Reproducir
                    </button>
                    <button className="hero-button info">
                        <Info size={20} /> Más información
                    </button>
                </div>

                <p className="hero-description">
                    {truncate(movie?.overview, 150)}
                </p>
            </motion.div>
            <div className="hero-fade-bottom" />
        </header>
    );
};

export default Hero;
