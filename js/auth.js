import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { showView } from './nav.js';

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    const header = document.getElementById('app-header');
    const nav = document.getElementById('bottom-nav');

    if (user) {
        // Logged In: Show App Shell
        header.classList.remove('hidden');
        nav.classList.remove('hidden');
        showView('dashboard');
    } else {
        // Logged Out: Hide UI and show Login
        header.classList.add('hidden');
        nav.classList.add('hidden');
        showView('login');
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
