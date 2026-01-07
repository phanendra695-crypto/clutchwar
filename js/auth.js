import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

if (document.getElementById("registerForm")) {
  document.getElementById("registerForm").onsubmit = async e => {
    e.preventDefault();
    const email = regEmail.value;
    const pass = regPassword.value;
    const u = await createUserWithEmailAndPassword(auth, email, pass);
    await setDoc(doc(db, "users", u.user.uid), { email, coins: 0 });
    location.href = "login.html";
  };
}

if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").onsubmit = async e => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value);
    location.href = "wallet.html";
  };
}
