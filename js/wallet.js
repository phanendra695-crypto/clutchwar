import { auth, db } from "./firebase.js";
import {
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const balanceEl = document.getElementById("coinBalance");

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    balanceEl.innerText = snap.data().coins + " Coins";
  }
});

// TEMP: Add coins for testing
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", async () => {
    const amount = parseInt(btn.innerText.replace("₹", ""));
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);
    const current = snap.data().coins || 0;

    await updateDoc(userRef, {
      coins: current + amount
    });

    balanceEl.innerText = (current + amount) + " Coins";
    alert(amount + " coins added (TEST MODE)");
  });
});

