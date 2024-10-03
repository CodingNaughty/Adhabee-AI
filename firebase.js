// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyATr99vo6THhQHSQnuQ3aGtS_YEc5eMOWM",
  authDomain: "adhabee-ai.firebaseapp.com",
  projectId: "adhabee-ai",
  storageBucket: "adhabee-ai.appspot.com",
  messagingSenderId: "991141034549",
  appId: "1:991141034549:web:8fa8b56a850bda72db4f7c",
  measurementId: "G-LT0VY8L66F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const analytics = getAnalytics(app);
