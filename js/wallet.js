import { auth, db } from "./firebase.js";
import { doc, getDoc, updateDoc }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

auth.onAuthStateChanged(async u => {
  if (!u) location.href = "login.html";
  const ref = doc(db, "users", u.uid);
  const snap = await getDoc(ref);
  coinBalance.innerText = snap.data().coins + " Coins";

  document.querySelectorAll("button").forEach(b => {
    b.onclick = async () => {
      const amt = parseInt(b.innerText.replace("₹",""));
      await updateDoc(ref, { coins: snap.data().coins + amt });
      location.reload();
    };
  });
});
