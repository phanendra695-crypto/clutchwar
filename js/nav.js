// js/nav.js
import { getAuth } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const contentArea = document.getElementById('main-content');

export function showView(view) {
    // Update active state in Navbar
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    
    if (view === 'dashboard') {
        document.getElementById('nav-home').classList.add('active');
        contentArea.innerHTML = `
            <div class="tab-bar">
                <button class="active">Upcoming</button>
                <button>Ongoing</button>
                <button>Results</button>
            </div>
            <div id="tournament-list">
                <p>Loading matches...</p>
            </div>
        `;
    } 
    
    if (view === 'wallet') {
        document.getElementById('nav-wallet').classList.add('active');
        contentArea.innerHTML = `
            <div class="wallet-card">
                <p>Available Balance</p>
                <h1>₹<span id="wallet-amt">0</span></h1>
                <div class="wallet-btns">
                    <button class="btn-add">ADD CASH</button>
                    <button class="btn-withdraw">WITHDRAW</button>
                </div>
            </div>
            <h3 style="margin-top:20px">Recent Transactions</h3>
            <div id="txn-history">No history found.</div>
        `;
    }
}

window.showView = showView; // Make globally accessible
