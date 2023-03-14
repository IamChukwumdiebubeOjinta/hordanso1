import { FirebaseConfig } from "../models";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyD-DgDecJHmllofAsaFklFKJ2oLFWIm7_8",
  authDomain: "ts-assessment.firebaseapp.com",
  databaseURL:
    "https://ts-assessment-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ts-assessment",
  storageBucket: "ts-assessment.appspot.com",
  messagingSenderId: "780775455568",
  appId: "1:780775455568:web:24172b9a2365c2e99c0a55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app)

export {auth, provider, db}
