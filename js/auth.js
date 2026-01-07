import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { showView } from './nav.js';

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
        // USER LOGGED IN
        document.getElementById('app-header').classList.remove('hidden');
        document.getElementById('bottom-nav').classList.remove('hidden');
        showView('dashboard'); // Redirect to dashboard
    } else {
        // USER LOGGED OUT - Show Login Screen
        document.getElementById('app-header').classList.add('hidden');
        document.getElementById('bottom-nav').classList.add('hidden');
        renderLoginScreen();
    }
});

function renderLoginScreen() {
    document.getElementById('main-content').innerHTML = `
        <div class="auth-container">
            <h2>Welcome to ClutchWar</h2>
            <input type="email" id="email" placeholder="Email">
            <input type="password" id="pass" placeholder="Password">
            <button onclick="handleLogin()" class="btn-primary">LOGIN</button>
            <p>Don't have an account? <span>Sign Up</span></p>
        </div>
    `;
}
