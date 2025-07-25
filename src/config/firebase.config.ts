import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};




// The getApps() function returns an array of initialized apps, so we check its length
// to determine if we need to initialize a new app or use the existing one.
// If there are no initialized apps, we call initializeApp() to create a new app instance.

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
// console.log('firebaseConfig.projectId:', firebaseConfig.projectId);

// Initialize Firestore
// Firestore is a cloud-hosted NoSQL database that lets you store and sync data between your users in real time.    
// Creating firestore helps in performing CRUD operations on the database by creating a reference to the database.

const db = getFirestore(app);

// db is exported to be used in other parts of the application.
export { db };