const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { sendVerificationEmail } = require('../services/emailService');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'vellix_secret_key_123';

// Helper: Generate 6-digit code
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// Register (Step 1: Create unverified user and send code)
router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            if (existingUser.isVerified) {
                return res.status(400).json({ message: 'User already exists and is verified' });
            }
            // If exists but not verified, we can update the code and resend
        }

        const verificationCode = generateCode();
        const codeExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
        const hashedPassword = await bcrypt.hash(password, 10);

        let user;
        if (existingUser) {
            user = await prisma.user.update({
                where: { email },
                data: {
                    name,
                    password: hashedPassword,
                    verificationCode,
                    verificationCodeExpires: codeExpires
                }
            });
        } else {
            user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                    verificationCode,
                    verificationCodeExpires: codeExpires
                }
            });
        }

        const emailSent = await sendVerificationEmail(email, verificationCode);

        res.status(201).json({
            message: 'Verification code sent to email',
            email: user.email,
            devMode: emailSent.devMode || false
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Verify Email (Step 2: Confirm code)
router.post('/verify-email', async (req, res) => {
    try {
        const { email, code } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.verificationCode !== code) {
            return res.status(400).json({ message: 'Invalid verification code' });
        }

        if (new Date() > user.verificationCodeExpires) {
            return res.status(400).json({ message: 'Verification code expired' });
        }

        await prisma.user.update({
            where: { email },
            data: {
                isVerified: true,
                verificationCode: null,
                verificationCodeExpires: null
            }
        });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({
            token,
            user: { id: user.id, email: user.email, name: user.name },
            message: 'Email verified successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Resend Verification Code
router.post('/resend-code', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const verificationCode = generateCode();
        const codeExpires = new Date(Date.now() + 15 * 60 * 1000);

        await prisma.user.update({
            where: { email },
            data: {
                verificationCode,
                verificationCodeExpires: codeExpires
            }
        });

        const emailSent = await sendVerificationEmail(email, verificationCode);
        res.status(200).json({
            message: 'New verification code sent',
            devMode: emailSent.devMode || false
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login (Update: Only login if verified)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: 'Please verify your email first', unverified: true });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
