import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useMovies = (endpoint = '/trending') => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`${API_URL}${endpoint}`);
                if (Array.isArray(response.data)) {
                    setMovies(response.data);
                } else {
                    setMovies([]);
                    console.warn(`Unexpected API response format for ${endpoint}`, response.data);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [endpoint]);

    return { movies, loading, error };
};
