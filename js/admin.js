import { db } from "./firebase.js";
import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const inputs = document.querySelectorAll("input");
const button = document.querySelector("button");

button.addEventListener("click", async () => {
  const name = inputs[0].value;
  const entryFee = parseInt(inputs[1].value);
  const time = inputs[2].value;

  if (!name || !entryFee || !time) {
    alert("Fill all fields");
    return;
  }

  await addDoc(collection(db, "tournaments"), {
    name,
    entryFee,
    time,
    createdAt: new Date()
  });

  alert("Tournament created");
});

