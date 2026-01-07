import { getFirestore, collection, getDocs, doc, runTransaction } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const db = getFirestore();
const auth = getAuth();

export async function loadMatches() {
    const querySnapshot = await getDocs(collection(db, "tournaments"));
    const container = document.getElementById('tournament-list');
    container.innerHTML = ""; // Clear loader

    querySnapshot.forEach((doc) => {
        const match = doc.data();
        const matchCard = `
            <div class="match-card">
                <div class="card-header">
                    <span class="tag">${match.type}</span>
                    <span class="time">${match.time}</span>
                </div>
                <div class="card-body">
                    <h4>${match.title}</h4>
                    <div class="stats">
                        <div class="stat"><span>Prize Pool</span><br><b>₹${match.prize}</b></div>
                        <div class="stat"><span>Entry</span><br><b>${match.entryFee} Coins</b></div>
                    </div>
                </div>
                <button class="btn-join" onclick="joinMatch('${doc.id}', ${match.entryFee})">JOIN NOW</button>
            </div>
        `;
        container.innerHTML += matchCard;
    });
}

window.joinMatch = async (matchId, fee) => {
    const user = auth.currentUser;
    const userRef = doc(db, "users", user.uid);
    const matchRef = doc(db, "tournaments", matchId);

    try {
        await runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(userRef);
            if (userDoc.data().balance < fee) {
                throw "Insufficient Coins!";
            }
            // Deduct coins and add to match
            transaction.update(userRef, { balance: userDoc.data().balance - fee });
            // Logic to add user to match participants would go here
        });
        alert("Joined Successfully!");
    } catch (e) {
        alert(e);
    }
};
