// Firebase Configuration
console.log('🔥 Loading Firebase config...');

// Firebase configuration - Replace with your actual config
const firebaseConfig = {
    apiKey: "AIzaSyC8r6olB67MWifBPVtyt72QAHIVkWhStqA",
    authDomain: "financial-planner-bba37.firebaseapp.com",
    projectId: "financial-planner-bba37",
    storageBucket: "financial-planner-bba37.firebasestorage.app",
    messagingSenderId: "1035058509819",
    appId: "1:1035058509819:web:785dd8584f95f0d811bd5e",
    measurementId: "G-M24XYZD0EW"
};

// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in other modules
export { auth, db, app };

console.log('✅ Firebase initialized successfully');
