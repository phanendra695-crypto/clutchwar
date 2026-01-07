import { auth, db } from "./firebase.js";
import { doc, getDoc, updateDoc }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

auth.onAuthStateChanged(async u => {
  if (!u) location.href = "login.html";
  document.querySelector("button").onclick = async () => {
    const ref = doc(db, "users", u.uid);
    const snap = await getDoc(ref);
    if (snap.data().coins < 20) return alert("Insufficient coins");
    await updateDoc(ref, { coins: snap.data().coins - 20 });
    alert("Joined tournament");
  };
});
