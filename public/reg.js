document.getElementById('loginBtn').addEventListener('click', login);
document.getElementById('signupBtn').addEventListener('click', signup);

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
        redirectToMail();
    } else {
        showMessage('Invalid login credentials.');
    }
}

function signup() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const storedEmail = localStorage.getItem('email');

    if (storedEmail === email) {
        showMessage('Email already registered. Please login.');
    } else {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        redirectToMail();
    }
}

function redirectToMail() {
    window.location.href = 'mail.html';
}

function showMessage(message) {
    document.getElementById('message').textContent = message;
}
