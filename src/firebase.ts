// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCBH3ySyiN6fhsDcP8maEbxJCh7keYOoHg",
  authDomain: "peshang-academy.firebaseapp.com",
  projectId: "peshang-academy",
  storageBucket: "peshang-academy.firebasestorage.app",
  messagingSenderId: "755450102417",
  appId: "1:755450102417:web:f61ffaf2567284f0b77530",
  measurementId: "G-GDEVQFBMLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);