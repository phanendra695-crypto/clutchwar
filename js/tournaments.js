import { auth, db } from "./firebase.js";
import {
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const JOIN_FEE = 20; // example

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please login");
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);
    const coins = snap.data().coins || 0;

    if (coins < JOIN_FEE) {
      alert("Insufficient coins");
      return;
    }

    await updateDoc(userRef, {
      coins: coins - JOIN_FEE
    });

    alert("Tournament joined successfully");
  });
});

