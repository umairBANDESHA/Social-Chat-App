import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB5KMo6e487NFyZgR_twX5LPGoKIjJRqEo",
  authDomain: "chatapp-socialy.firebaseapp.com",
  projectId: "chatapp-socialy",
  storageBucket: "chatapp-socialy.firebasestorage.app",
  messagingSenderId: "1030232009294",
  appId: "1:1030232009294:web:7b3ed7db292510ee90f11f",
  measurementId: "G-HNYK2NGG4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);