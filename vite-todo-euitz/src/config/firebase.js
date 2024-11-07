// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBUBncungBKhk9Ud4zkTeYBdnUJsokFEuM",
    authDomain: "vite-todo-euitz.firebaseapp.com",
    projectId: "vite-todo-euitz",
    storageBucket: "vite-todo-euitz.firebasestorage.app",
    messagingSenderId: "899934149603",
    appId: "1:899934149603:web:fe93f3bc774fa1130d1ed6",
    measurementId: "G-NDK0XXYNM7"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };