import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase config using Vite environment variables
// These values are securely pulled from Vercel's Environment Variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: "finsaarthi-89698.firebasestorage.app",
  messagingSenderId: "609023109118",
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase (only if not already initialized)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Auth & Google provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Set additional Google provider settings (optional)
googleProvider.setCustomParameters({
  prompt: "select_account",
});