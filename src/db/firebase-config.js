// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOq4EQrGnseWV9NWAZOwe_aiciv_AXEzM",
  authDomain: "chatapp-b8482.firebaseapp.com",
  projectId: "chatapp-b8482",
  storageBucket: "chatapp-b8482.appspot.com",
  messagingSenderId: "50625684318",
  appId: "1:50625684318:web:76c98b8fea108583b0e5cf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
