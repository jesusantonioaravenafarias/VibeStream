import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import './SearchPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (query) {
            const fetchResults = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`${API_URL}/movies/search`, {
                        params: { query, lang: navigator.language }
                    });
                    setResults(response.data);
                } catch (error) {
                    console.error("Error searching:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchResults();
        }
    }, [query]);

    return (
        <div className="search-page">
            <h2 className="search-title">Resultados para: "{query}"</h2>

            {loading ? (
                <div className="search-loading">Buscando...</div>
            ) : (
                <>
                    {results.length > 0 ? (
                        <div className="search-grid">
                            {results.map((item) => (
                                <motion.div
                                    layout
                                    key={item.id}
                                    className="search-card"
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => navigate(`/watch/${item.id}`, { state: { type: item.media_type || 'movie' } })}
                                >
                                    <img
                                        src={item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                                        alt={item.title || item.name}
                                        className="search-poster"
                                    />
                                    <div className="search-info">
                                        <h3>{item.title || item.name}</h3>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            No encontramos nada para "{query}" :(
                            <br />
                            <span style={{ fontSize: '12px', color: 'red' }}>Current API: {API_URL}</span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchPage;
