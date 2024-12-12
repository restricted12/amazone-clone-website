// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// auth
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBU5itKlnGWOEaeIeb8AKhjKCMPcfBE_i4",
  authDomain: "clone-19120.firebaseapp.com",
  projectId: "clone-19120",
  storageBucket: "clone-19120.appspot.com",
  messagingSenderId: "827146046151",
  appId: "1:827146046151:web:21f223414dc7b4e3d54ce2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Initialize Firebase Auth
export const db = getFirestore(app); // Initialize Firestore
