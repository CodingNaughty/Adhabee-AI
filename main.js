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

const googleLogin = document.getElementById("google-login-btn");

if (googleLogin) {
  googleLogin.addEventListener("click", function(){
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user);
        // Redirect to logged.html page
        window.location.href = "../widget.html";
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  });
}

// reset

const reset = document.getElementById("reset");

if (reset) {
  reset.addEventListener("click", async function(event){
    event.preventDefault()
    
    const email = document.getElementById("email").value;
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error) {
      console.error(error);
      alert("Error sending password reset email: " + error.message);
    }
  });
}

// Get the sign-in form elements
const signInForm = document.getElementById('sign-in-form');

if (signInForm) {
  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Sign-in form submitted');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log('Email:', email);
    console.log('Password:', password);
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('Sign-in successful');
        // User signed in successfully
        console.log('User   signed in successfully');
        // Redirect to logged.html page
        window.location.href = "../widget.html";
      })
      .catch((error) => {
        console.log('Sign-in error');
        // Handle sign-in error
        console.error('Error signing in:', error);
        alert('Error signing in: ' + error.message);
      });
  });
}