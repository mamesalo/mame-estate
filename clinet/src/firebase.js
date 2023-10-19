// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mame-estate.firebaseapp.com",
  projectId: "mame-estate",
  storageBucket: "mame-estate.appspot.com",
  messagingSenderId: "657984714142",
  appId: "1:657984714142:web:0b4cbfe4c682ab07aa528f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);