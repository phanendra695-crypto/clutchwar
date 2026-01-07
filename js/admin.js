import { db } from "./firebase.js";
import { collection, addDoc }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.querySelector("button").onclick = async () => {
  const i = document.querySelectorAll("input");
  await addDoc(collection(db, "tournaments"), {
    name: i[0].value,
    fee: i[1].value,
    time: i[2].value
  });
  alert("Tournament Created");
};
