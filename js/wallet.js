import { getFirestore, doc, onSnapshot, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const db = getFirestore();
const auth = getAuth();

export function initWallet() {
    const user = auth.currentUser;
    
    // Real-time listener for balance
    onSnapshot(doc(db, "users", user.uid), (doc) => {
        const balance = doc.data().balance;
        document.getElementById('balance-display').innerText = balance;
        if(document.getElementById('wallet-amt')) {
            document.getElementById('wallet-amt').innerText = balance;
        }
    });
}

window.requestWithdrawal = async () => {
    const amount = prompt("Enter amount to withdraw:");
    const upi = prompt("Enter UPI ID:");

    if (amount && upi) {
        await addDoc(collection(db, "withdrawals"), {
            uid: auth.currentUser.uid,
            amount: Number(amount),
            upi: upi,
            status: "pending",
            timestamp: Date.now()
        });
        alert("Withdrawal request sent!");
    }
};
