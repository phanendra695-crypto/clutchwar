// Import the ALREADY initialized db and auth from your firebase.js
import { db, auth } from './firebase.js'; 
import { collection, getDocs, doc, runTransaction, arrayUnion } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

/**
 * Loads tournaments from Firestore and renders them into the dashboard
 */
export async function loadMatches() {
    try {
        const querySnapshot = await getDocs(collection(db, "tournaments"));
        const container = document.getElementById('tournament-list');
        
        if (!container) return;
        container.innerHTML = ""; // Clear existing content/loader

        querySnapshot.forEach((tournamentDoc) => {
            const match = tournamentDoc.data();
            const matchCard = `
                <div class="match-card">
                    <div class="card-header">
                        <span class="tag">${match.type || 'Classic'}</span>
                        <span class="time">${match.time || 'TBD'}</span>
                    </div>
                    <div class="match-details">
                        <h4>${match.title}</h4>
                        <div class="match-grid">
                            <div class="grid-item"><span>Prize Pool</span><b>₹${match.prize}</b></div>
                            <div class="grid-item"><span>Entry</span><b>${match.entryFee} Coins</b></div>
                            <div class="grid-item"><span>Mode</span><b>${match.mode || 'Solo'}</b></div>
                        </div>
                    </div>
                    <button class="btn-join" onclick="joinMatch('${tournamentDoc.id}', ${match.entryFee})">JOIN NOW</button>
                </div>
            `;
            container.innerHTML += matchCard;
        });
    } catch (error) {
        console.error("Error loading matches: ", error);
    }
}

/**
 * Handles the logic for joining a match using a secure transaction
 */
window.joinMatch = async (matchId, fee) => {
    const user = auth.currentUser;
    
    if (!user) {
        alert("Please login to join matches!");
        return;
    }

    const userRef = doc(db, "users", user.uid);
    const matchRef = doc(db, "tournaments", matchId);

    try {
        await runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(userRef);
            const matchDoc = await transaction.get(matchRef);

            if (!userDoc.exists()) throw "User profile not found!";
            
            // 1. Check Balance
            if (userDoc.data().balance < fee) {
                throw "Insufficient Coins! Please add coins to your wallet.";
            }

            // 2. Check if Match is full
            if (matchDoc.data().joined >= matchDoc.data().slots) {
                throw "Match is full!";
            }

            // 3. Deduct coins and add user to the participants list
            transaction.update(userRef, { 
                balance: userDoc.data().balance - fee 
            });

            transaction.update(matchRef, { 
                joinedPlayers: arrayUnion(user.uid),
                joined: (matchDoc.data().joined || 0) + 1
            });
        });

        alert("Successfully joined the tournament!");
        window.showView('dashboard'); // Refresh view
    } catch (e) {
        alert("Join failed: " + e);
    }
};
