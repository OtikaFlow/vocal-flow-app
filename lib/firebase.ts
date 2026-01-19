import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC9mtMgpoRVZkHE6QHywJOQ6rXk5Eb93Uc",
    authDomain: "vocalflow-92640.firebaseapp.com",
    projectId: "vocalflow-92640",
    storageBucket: "vocalflow-92640.firebasestorage.app",
    messagingSenderId: "779008202473",
    appId: "1:779008202473:web:95c8126c6e95a0c1c30278",
    measurementId: "G-TN95V3Y6LP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
