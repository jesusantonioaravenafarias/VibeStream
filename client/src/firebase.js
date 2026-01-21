// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCLya3S8z_nTsZkbpiHwgzFMcHUHkCPZYA",
    authDomain: "vibestream-4998b.firebaseapp.com",
    projectId: "vibestream-4998b",
    storageBucket: "vibestream-4998b.firebasestorage.app",
    messagingSenderId: "790591693112",
    appId: "1:790591693112:web:d603bb19713bc4b97ba1cd",
    measurementId: "G-KBMPC8FHJN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
