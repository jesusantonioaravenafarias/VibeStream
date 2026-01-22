import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Server } from 'lucide-react';
import axios from 'axios';
import './WatchPage.css';

const WatchPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Determine type (default to movie if not provided)
    const mediaType = location.state?.type === 'tv' ? 'tv' : 'movie';
    const isMovie = mediaType === 'movie';
    const lang = navigator.language.startsWith('es') ? 'es' : 'en'; // Simple logic for major providers

    const servers = [
        { name: 'Latino Pro (VidLink)', url: `https://vidlink.pro/movie/${id}` },
        { name: 'Multi-Res (Smashy)', url: `https://player.smashy.stream/movie/${id}` }, // Aggregator
        { name: 'Fast (AutoEmbed)', url: `https://autoembed.to/movie/tmdb/${id}` }, // Another source
        { name: 'HD (Super)', url: `https://vidsrc.cc/v2/embed/${mediaType}/${id}?autoPlay=true&lang=${lang}` },
        {
            name: 'Premium (Embed.su)', url: isMovie
                ? `https://embed.su/embed/movie/${id}`
                : `https://embed.su/embed/tv/${id}/1/1`
        },
        { name: 'Plus (VidSrc.to)', url: `https://vidsrc.to/embed/${mediaType}/${id}?lang=${lang}` },
        {
            name: 'Hosts (Dood/Filemoon)', url: isMovie
                ? `https://multiembed.mov/?video_id=${id}&tmdb=1&lang=${lang}`
                : `https://multiembed.mov/?video_id=${id}&tmdb=1&s=1&e=1&lang=${lang}`
        }
    ];

    const [currentServer, setCurrentServer] = useState(servers[0]);
    const [movieTitle, setMovieTitle] = useState('');

    useEffect(() => {
        const fetchTitle = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/movies/${id}`, {
                    params: { lang: navigator.language }
                });
                setMovieTitle(response.data.title || response.data.name || '');
            } catch (error) {
                console.error("Error fetching title", error);
            }
        };
        fetchTitle();
    }, [id]);

    return (
        <div className="watch-screen">
            <div className="watch-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={24} /> Volver
                </button>

                <div className="server-selector">
                    <span className="server-label"><Server size={16} /> Servidor:</span>
                    {servers.map((server, index) => (
                        <button
                            key={index}
                            className={`server-btn ${currentServer.name === server.name ? 'active' : ''}`}
                            onClick={() => setCurrentServer(server)}
                        >
                            {server.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="player-wrapper">
                <iframe
                    key={currentServer.url} // Force reload on change
                    className="watch-player"
                    src={currentServer.url}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                    allowFullScreen
                    referrerPolicy="origin"
                    title="Reproductor"
                ></iframe>
            </div>

            {movieTitle && (
                <div className="watch-fallback">
                    <p>¿Sigue en Inglés? 😓</p>
                    <a
                        href={`https://www.google.com/search?q=ver+${encodeURIComponent(movieTitle)}+online+latino+gratis`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="google-btn"
                    >
                        🔍 Buscar "{movieTitle}" en Latino (Google)
                    </a>
                </div>
            )}
        </div>
    );
};

export default WatchPage;
