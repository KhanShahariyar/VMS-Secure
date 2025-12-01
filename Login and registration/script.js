// Get references to the DOM elements
const loginToggle = document.getElementById('login-toggle');
const registerToggle = document.getElementById('register-toggle');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Dummy credentials
const dummyEmail = 'user@gmail.com';
const dummyPassword = 'user';

// Create login error message
const loginErrorMsg = document.createElement('p');
loginErrorMsg.textContent = 'Invalid email or password.';
loginErrorMsg.className = 'text-red-400 text-center mt-2 hidden';
loginForm.appendChild(loginErrorMsg);

// Create registration success message
const registerSuccessMsg = document.createElement('p');
registerSuccessMsg.textContent = 'Registered successfully! You can now login.';
registerSuccessMsg.className = 'text-green-400 text-center mt-2 hidden';
registerForm.appendChild(registerSuccessMsg);

// Handle Login toggle
loginToggle.addEventListener('click', function () {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');

    loginToggle.classList.add('active');
    registerToggle.classList.remove('active');

    loginForm.classList.add('fade-in');
    registerForm.classList.remove('fade-in');
});

// Handle Register toggle
registerToggle.addEventListener('click', function () {
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');

    registerToggle.classList.add('active');
    loginToggle.classList.remove('active');

    registerForm.classList.add('fade-in');
    loginForm.classList.remove('fade-in');
});

// Handle login form submission
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (email === dummyEmail && password === dummyPassword) {
        // Set login flag
        localStorage.setItem('loggedIn', 'true');
        // Redirect to User Dashboard
        window.location.href = '../User/user.html';
    } else {
        // Show error message
        loginErrorMsg.classList.remove('hidden');
        setTimeout(() => loginErrorMsg.classList.add('hidden'), 3000);
    }
});

// Handle registration form submission
registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Show success message
    registerSuccessMsg.classList.remove('hidden');

    // Hide the message after 3 seconds and switch to login
    setTimeout(() => {
        registerSuccessMsg.classList.add('hidden');
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        loginToggle.classList.add('active');
        registerToggle.classList.remove('active');
    }, 3000);

    // Reset registration form fields
    registerForm.reset();
});
