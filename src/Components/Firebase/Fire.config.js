// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVKANmEQd8WAwj7zy8fWEcENmML4dPpWU",
  authDomain: "user-email-password-auth-5bf99.firebaseapp.com",
  projectId: "user-email-password-auth-5bf99",
  storageBucket: "user-email-password-auth-5bf99.appspot.com",
  messagingSenderId: "433169785259",
  appId: "1:433169785259:web:7ce6eff3dd449f057232ee",
  measurementId: "G-DSRNMBRTEE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
