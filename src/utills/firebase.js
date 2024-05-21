// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYFu56rKirmJ5w99dU_yxFG7xF_rODBg8",
  authDomain: "netflixgpt-57b7b.firebaseapp.com",
  projectId: "netflixgpt-57b7b",
  storageBucket: "netflixgpt-57b7b.appspot.com",
  messagingSenderId: "182211308936",
  appId: "1:182211308936:web:321aa91e5f6a5ed6411e3d",
  measurementId: "G-GPQKQR1SCS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();