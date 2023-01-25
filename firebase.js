// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXGh9XSZfR_7SSVKZtCY7baLoAIDk3Z-s",
  authDomain: "app2-96f74.firebaseapp.com",
  projectId: "app2-96f74",
  storageBucket: "app2-96f74.appspot.com",
  messagingSenderId: "210351647096",
  appId: "1:210351647096:web:068a89598f67d88b50c08d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);