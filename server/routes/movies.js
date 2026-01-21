const express = require('express');
const router = express.Router();
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const JWT_SECRET = process.env.JWT_SECRET || 'vellix_secret_key_123';

// Middleware to verify JWT for favorite operations
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Get Trending Movies
router.get('/trending', async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/trending/all/week`, {
            params: { api_key: TMDB_API_KEY }
        });
        res.json(response.data.results);
    } catch (error) {
        // Fallback data if API key is missing
        res.json([{ id: 1, title: 'API Key Missing', poster_path: null }]);
    }
});

// Get Movie Details
router.get('/:id', async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${req.params.id}`, {
            params: { api_key: TMDB_API_KEY, append_to_response: 'videos' }
        });
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ message: 'Movie not found' });
    }
});

// Add to Favorites
router.post('/favorites', authenticate, async (req, res) => {
    try {
        const { movieId, title, posterPath } = req.body;
        const favorite = await prisma.favorite.create({
            data: {
                userId: req.userId,
                movieId,
                title,
                posterPath
            }
        });
        res.status(201).json(favorite);
    } catch (error) {
        res.status(500).json({ message: 'Error adding favorite' });
    }
});

// Get User Favorites
router.get('/favorites/me', authenticate, async (req, res) => {
    try {
        const favorites = await prisma.favorite.findMany({
            where: { userId: req.userId }
        });
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching favorites' });
    }
});

module.exports = router;
