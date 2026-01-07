import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const db = getFirestore();

export async function createTournament(data) {
    // Data: { title, entryFee, prize, time, type }
    try {
        await addDoc(collection(db, "tournaments"), {
            ...data,
            roomId: "",
            roomPass: "",
            revealTime: null,
            status: "upcoming"
        });
        alert("Match Created!");
    } catch (e) {
        console.error("Error adding match: ", e);
    }
}
