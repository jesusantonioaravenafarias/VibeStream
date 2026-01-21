import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Row.css';
import { useMovies } from '../hooks/useMovies';
import MovieModal from './MovieModal';

const Row = ({ title, endpoint, isLargeRow }) => {
    const { movies, loading, error } = useMovies(endpoint);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const rowRef = useRef(null);

    const scroll = (direction) => {
        if (rowRef.current) {
            const { current } = rowRef;
            const scrollAmount = direction === 'left' ? -window.innerWidth / 2 : window.innerWidth / 2;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="row">
            <h2 className="row-title">{title}</h2>

            <div className="row-slider">
                <div className="slider-arrow left" onClick={() => scroll('left')}>
                    <ChevronLeft size={40} />
                </div>

                <div className="row-posters" ref={rowRef}>
                    {loading && <p className="status-msg">Cargando...</p>}
                    {error && <p className="status-msg error">Error: {error}</p>}
                    {!loading && !error && movies.length === 0 && <p className="status-msg">No hay contenido disponible.</p>}
                    {movies.map((movie, index) => (
                        <motion.div
                            key={movie.id}
                            className={`movie-card ${isLargeRow ? 'large' : ''}`}
                            onClick={() => setSelectedMovie(movie)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.08 }}
                        >
                            <img
                                className={`row-poster ${isLargeRow ? 'row-poster-large' : ''}`}
                                src={`https://image.tmdb.org/t/p/w500/${isLargeRow ? movie.poster_path : (movie.backdrop_path || movie.poster_path)}`}
                                alt={movie.name}
                            />
                            <div className="movie-info">
                                <h3>{movie?.title || movie?.name}</h3>
                                <p>{movie?.release_date?.split('-')[0]}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="slider-arrow right" onClick={() => scroll('right')}>
                    <ChevronRight size={40} />
                </div>
            </div>

            <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        </section>
    );
};

export default Row;
