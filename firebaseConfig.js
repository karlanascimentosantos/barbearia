// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdtk4H6quhQugRE8eICd8Ywa8kN5Ro7lY",
  authDomain: "project-security-mobile.firebaseapp.com",
  projectId: "project-security-mobile",
  storageBucket: "project-security-mobile.firebasestorage.app",
  messagingSenderId: "787121515876",
  appId: "1:787121515876:web:2338189133f22c31d75e71",
  measurementId: "G-EB9DE158H7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);