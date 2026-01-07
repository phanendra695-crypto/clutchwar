import { auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

auth.onAuthStateChanged(user => {
  guestNav.style.display = user ? "none" : "inline";
  userNav.style.display = user ? "inline" : "none";
});

logoutBtn.onclick = async () => {
  await signOut(auth);
  location.href = "index.html";
};
