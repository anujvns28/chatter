// // firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// // Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNLQ7h-NgEP44uFqOcbd5k4HB9oCcxILg",
  authDomain: "chatter-92044.firebaseapp.com",
  projectId: "chatter-92044",
  storageBucket: "chatter-92044.firebasestorage.app",
  messagingSenderId: "67312415153",
  appId: "1:67312415153:web:9dbe4e546810c17a7e4d90",
  measurementId: "G-GQKS9PJ9S7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// // Initialize messaging
const messaging = getMessaging(app);

export { messaging };
// //
