// js/nav.js
import { getAuth } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { loadMatches } from './tournaments.js'; // Import your match loader
import { initWallet } from './wallet.js';       // Import your wallet listener

const contentArea = document.getElementById('main-content');

/**
 * Switch between "Apps" screens without reloading the page
 */
export function showView(view) {
    // 1. Update Navigation UI active states
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    
    // 2. Handle View Injection
    if (view === 'dashboard') {
        document.getElementById('nav-home').classList.add('active');
        
        contentArea.innerHTML = `
            <div class="app-section">
                <div class="tab-bar">
                    <button class="tab-btn active" onclick="filterMatches('upcoming')">Upcoming</button>
                    <button class="tab-btn" onclick="filterMatches('ongoing')">Ongoing</button>
                    <button class="tab-btn" onclick="filterMatches('results')">Results</button>
                </div>
                <div id="tournament-list" class="match-container">
                    <div class="loader-inner">Loading matches...</div>
                </div>
            </div>
        `;
        
        // Fetch real-time matches from Firestore
        loadMatches('upcoming'); 
    } 
    
    else if (view === 'wallet') {
        document.getElementById('nav-wallet').classList.add('active');
        
        contentArea.innerHTML = `
            <div class="app-section">
                <div class="wallet-card">
                    <div class="wallet-info">
                        <p>Total Balance</p>
                        <h1>₹<span id="wallet-amt">0</span></h1>
                    </div>
                    <div class="wallet-actions">
                        <button class="btn-action add" onclick="openAddCash()">
                            <i class="fas fa-plus"></i> ADD
                        </button>
                        <button class="btn-action withdraw" onclick="requestWithdrawal()">
                            <i class="fas fa-arrow-up"></i> WITHDRAW
                        </button>
                    </div>
                </div>
                
                <div class="transaction-section">
                    <h3>Transaction History</h3>
                    <div id="txn-history" class="history-list">
                        <p class="empty-msg">No transactions yet.</p>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize real-time balance listener
        initWallet();
    }

    else if (view === 'profile') {
        document.getElementById('nav-profile').classList.add('active');
        const user = getAuth().currentUser;
        
        contentArea.innerHTML = `
            <div class="profile-container">
                <div class="profile-header">
                    <i class="fas fa-user-circle"></i>
                    <h2>${user?.email?.split('@')[0] || 'Gamer'}</h2>
                    <p>${user?.email}</p>
                </div>
                <div class="profile-menu">
                    <button class="menu-item" onclick="window.location.reload()">Refresh App</button>
                    <button class="menu-item logout" onclick="handleLogout()">Logout</button>
                </div>
            </div>
        `;
    }
}

// Helper to switch tabs within the dashboard
window.filterMatches = (status) => {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    loadMatches(status);
};

// Make globally accessible for HTML onclick events
window.showView = showView;
