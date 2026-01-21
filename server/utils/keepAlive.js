const axios = require('axios');

const URL = process.env.BACKEND_URL || 'http://localhost:5000';

const keepAlive = () => {
    setInterval(async () => {
        try {
            console.log('Sending keep-alive ping...');
            await axios.get(`${URL}/`);
            console.log('Ping successful!');
        } catch (error) {
            console.error('Error in keep-alive ping:', error.message);
        }
    }, 8 * 60 * 1000); // 8 minutes
};

module.exports = keepAlive;
