```javascript
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
    
    const servers = [
        { name: 'LATAM 1', url: `https://vidsrc.xyz/embed/${mediaType}/${id}` },
{ name: 'LATAM 2', url: `https://vidsrc.to/embed/${mediaType}/${id}` },
{ name: 'LATAM 3', url: `https://www.2embed.cc/embed/${id}` }, // Note: 2embed structure varies, sticking to simple id for now
{ name: 'HD', url: `https://vidsrc.cc/v2/embed/${mediaType}/${id}` }
    ];

const [currentServer, setCurrentServer] = useState(servers[0]);

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
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                title="Reproductor"
            ></iframe>
        </div>
    </div>
);
};

export default WatchPage;
