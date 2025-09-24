// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyGDcV0jjZkMT2DWkYvSP-JZA4nKjsZWY",
  authDomain: "paguma-calendar.firebaseapp.com",
  projectId: "paguma-calendar",
    storageBucket: "paguma-calendar.appspot.com",
  messagingSenderId: "221901828147",
  appId: "1:221901828147:web:fda6a6a18edf1179a8b346"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };