// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlTne74ZyE5ogtalwoN4L6OXF0GB_we_Q",
  authDomain: "dotmov-3b07f.firebaseapp.com",
  projectId: "dotmov-3b07f",
  storageBucket: "dotmov-3b07f.appspot.com",
  messagingSenderId: "362693862848",
  appId: "1:362693862848:web:0c3f7a9b2dd2e245b69425",
  measurementId: "G-5X7PG47LX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, db, auth, analytics };
export default app;
export { firebaseConfig };