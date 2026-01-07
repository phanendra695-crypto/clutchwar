
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCg9YRnpy3YzBKfPn2bxiSVAd1_rRrJZ6w",
  authDomain: "clutchwar-f66ab.firebaseapp.com",
  projectId: "clutchwar-f66ab",
  storageBucket: "clutchwar-f66ab.firebasestorage.app",
  messagingSenderId: "1061667363012",
  appId: "1:1061667363012:web:3a6f456ac0d1f0813e9191"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
