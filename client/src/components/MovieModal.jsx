import React, { useEffect, useState, useRef } from 'react';
import { X, Play, Plus, Check, Star, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import YouTube from 'react-youtube';
import './MovieModal.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const MovieModal = ({ movie, onClose }) => {
    const [details, setDetails] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [isMuted, setIsMuted] = useState(false); // Default to unmuted per request
    const playerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (movie) {
            const fetchDetails = async () => {
                try {
                    const response = await axios.get(`${API_URL}/movies/${movie.id}`, {
                        params: { lang: navigator.language }
                    });
                    setDetails(response.data);
                    const video = response.data.videos?.results.find(v => v.type === 'Trailer') || response.data.videos?.results[0];
                    if (video) setTrailer(video.key);
                } catch (error) {
                    console.error("Error fetching movie details", error);
                }
            };
            fetchDetails();
        }
    }, [movie]);

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            mute: 0, // Request unmuted
            loop: 1,
            playlist: trailer
        },
    };

    const toggleMute = () => {
        if (playerRef.current) {
            if (isMuted) {
                playerRef.current.unMute();
            } else {
                playerRef.current.mute();
            }
            setIsMuted(!isMuted);
        }
    };

    const onReady = (event) => {
        playerRef.current = event.target;
        // Try to start unmuted, but browsers might block it.
        // If blocked, we handle it gracefully (user can use the button).
        event.target.playVideo();
        if (!isMuted) {
            event.target.unMute();
        }
    };

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
                            <div className="video-container">
                                <YouTube
                                    videoId={trailer}
                                    opts={opts}
                                    className="modal-trailer"
                                    onReady={onReady}
                                />
                                <button className="volume-btn" onClick={(e) => {
                                    e.stopPropagation();
                                    toggleMute();
                                }}>
                                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                                </button>
                            </div>
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
                                <button className="modal-btn play-btn" onClick={() => navigate(`/watch/${movie.id}`, { state: { type: movie.media_type || 'movie' } })}>
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
