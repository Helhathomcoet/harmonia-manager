// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADjbtAvLHb8LEzQE-MuPHv1_8hRsTZqhA",
  authDomain: "harmonia-manager.firebaseapp.com",
  projectId: "harmonia-manager",
  storageBucket: "harmonia-manager.appspot.com",
  messagingSenderId: "527739350936",
  appId: "1:527739350936:web:b03faaa252711d2ae845ed",
  measurementId: "G-HYTWZ6C1HJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// à la fin de votre fichier firebase.js
export { app, db, analytics };
