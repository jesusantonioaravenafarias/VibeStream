import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import YouTube from 'react-youtube';
import './WatchPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const WatchPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trailer, setTrailer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await axios.get(`${API_URL}/movies/${id}`);
                const video = response.data.videos?.results.find(v => v.type === 'Trailer') || response.data.videos?.results[0];
                if (video) setTrailer(video.key);
            } catch (error) {
                console.error("Error fetching video", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVideo();
    }, [id]);

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            controls: 1, // Full controls for the watch page
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
        },
    };

    return (
        <div className="watch-screen">
            <div className="watch-nav">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={30} /> Volver
                </button>
            </div>

            <div className="player-wrapper">
                <iframe
                    className="watch-player"
                    src={`https://vidsrc.xyz/embed/movie/${id}`}
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="Reproductor"
                ></iframe>
            </div>
        </div>
    );
};

export default WatchPage;
