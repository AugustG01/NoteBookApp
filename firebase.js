// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAVXEmfB3FHMLcv5elEKq9Y2H0HeGpzCo",
  authDomain: "notebook-ea65b.firebaseapp.com",
  projectId: "notebook-ea65b",
  storageBucket: "notebook-ea65b.appspot.com",
  messagingSenderId: "582705820559",
  appId: "1:582705820559:web:82ce915f1db3e4927211fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const storage = getStorage(app);
export { app, database, storage }