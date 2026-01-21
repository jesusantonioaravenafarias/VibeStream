import React, { useEffect, useState } from 'react';
import { X, Play, Plus, Check, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import AdBanner from './AdBanner';
import './MovieModal.css';

const MovieModal = ({ movie, onClose }) => {
    const [details, setDetails] = useState(null);
    const [trailer, setTrailer] = useState(null);

    useEffect(() => {
        if (movie) {
            const fetchDetails = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/movies/${movie.id}`);
                    setDetails(response.data);
                    const video = response.data.videos?.results.find(v => v.type === 'Trailer');
                    if (video) setTrailer(video.key);
                } catch (error) {
                    console.error("Error fetching movie details", error);
                }
            };
            fetchDetails();
        }
    }, [movie]);

    if (!movie) return null;

    return (
        <AnimatePresence>
            <div className="modal-overlay" onClick={onClose}>
                <motion.div
                    className="modal-content"
                    onClick={e => e.stopPropagation()}
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 50 }}
                >
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>

                    <div className="modal-header">
                        {trailer ? (
                            <iframe
                                className="modal-trailer"
                                src={`https://www.youtube.com/embed/${trailer}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailer}`}
                                title="Movie Trailer"
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                            />
                        ) : (
                            <img
                                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                alt={movie.title}
                                className="modal-fallback-img"
                            />
                        )}
                        <div className="modal-header-fade" />
                    </div>

                    <div className="modal-body">
                        <div className="modal-main-info">
                            <h1 className="modal-title">{movie?.title || movie?.name}</h1>
                            <div className="modal-meta">
                                <span className="modal-rating"><Star size={14} fill="gold" /> {movie.vote_average.toFixed(1)}</span>
                                <span className="modal-year">{movie.release_date?.split('-')[0]}</span>
                                <span className="modal-runtime">{details?.runtime} min</span>
                            </div>
                            <div className="modal-actions">
                                <button className="modal-btn play-btn">
                                    <Play size={20} fill="black" /> Reproducir
                                </button>
                                <button className="modal-btn icon-btn">
                                    <Plus size={24} />
                                </button>
                            </div>
                            <p className="modal-overview">{movie.overview}</p>
                        </div>

                        <div className="modal-secondary-info">
                            <p><span>Géneros:</span> {details?.genres?.map(g => g.name).join(', ')}</p>
                            <p><span>Votos:</span> {movie.vote_count}</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default MovieModal;
