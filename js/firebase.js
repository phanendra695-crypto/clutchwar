

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCg9YRnpy3YzBKfPn2bxiSVAd1_rRrJZ6w",
  authDomain: "clutchwar-f66ab.firebaseapp.com",
  projectId: "clutchwar-f66ab",
  storageBucket: "clutchwar-f66ab.firebasestorage.app",
  messagingSenderId: "1061667363012",
  appId: "1:1061667363012:web:3a6f456ac0d1f0813e9191"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services so other files can use them
export const auth = getAuth(app);
export const db = getFirestore(app);
