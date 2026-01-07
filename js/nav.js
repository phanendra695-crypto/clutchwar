// js/nav.js
import { getAuth } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { loadMatches } from './tournaments.js'; 
import { initWallet } from './wallet.js';       

const contentArea = document.getElementById('main-content');

export function showView(view) {
    // 1. Reset active states on bottom nav
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    
    // 2. Switch Views
    if (view === 'login') {
        contentArea.innerHTML = `
            <div class="card auth-form">
                <h2>Login</h2>
                <form id="loginForm">
                    <input id="loginEmail" type="email" placeholder="Email" required>
                    <input id="loginPassword" type="password" placeholder="Password" required>
                    <button type="submit">Login</button>
                </form>
                <p onclick="showView('register')" style="margin-top:15px; cursor:pointer; color:#ff4b2b">Create an Account</p>
            </div>`;
    } 
    
    else if (view === 'register') {
        contentArea.innerHTML = `
            <div class="card auth-form">
                <h2>Create Account</h2>
                <form id="registerForm">
                    <input id="regEmail" type="email" placeholder="Email" required>
                    <input id="regPassword" type="password" placeholder="Password" required>
                    <button type="submit">Register</button>
                </form>
                <p onclick="showView('login')" style="margin-top:15px; cursor:pointer; color:#ff4b2b">Back to Login</p>
            </div>`;
    }

    else if (view === 'dashboard') {
        document.getElementById('nav-home').classList.add('active');
        contentArea.innerHTML = `
            <header class="view-header"><h1>🎮 Tournaments</h1></header>
            <div id="tournament-list">
                <div class="loader-inner">Loading matches...</div>
            </div>`;
        loadMatches(); // This calls your tournaments.js logic
    } 
    
    else if (view === 'wallet') {
        document.getElementById('nav-wallet').classList.add('active');
        contentArea.innerHTML = `
            <header class="view-header"><h2>My Wallet</h2></header>
            <div class="card wallet-card">
                <p id="coinBalance" class="balance-text">0 Coins</p>
                <div class="add-coins-grid">
                    <button onclick="addCoins(1)">₹1</button>
                    <button onclick="addCoins(10)">₹10</button>
                    <button onclick="addCoins(50)">₹50</button>
                </div>
                <p class="note">₹1 = 1 Coin</p>
                <button class="withdraw-btn" onclick="requestWithdrawal()">Withdraw</button>
            </div>`;
        initWallet(); // This calls your wallet.js logic
    }
}

window.showView = showView; // Make it global
