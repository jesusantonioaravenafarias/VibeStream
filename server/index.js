const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const keepAlive = require('./utils/keepAlive');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

keepAlive();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('VibeStream API is running... 🚀');
});

// Routes will be imported// Routes
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
