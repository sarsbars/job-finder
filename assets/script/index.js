'use strict';

const loginForm = document.querySelector('.login-form');
const signupButton = document.querySelector('.secondary-btn');
const usernameInput = document.querySelector('input[type="text"]');
const passwordInput = document.querySelector('input[type="password"]');
const heading = document.querySelector('.login-content h1');
const loginSubmitButton = loginForm.querySelector('button[type="submit"]');

let isSignupMode = false;

document.addEventListener('DOMContentLoaded', () => {
    loginForm.addEventListener('submit', handleFormSubmit);
    signupButton.addEventListener('click', toggleFormMode);
});

function handleFormSubmit(e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!areFieldsFilled(username, password)) {
        alert('Please fill in both Email or Username and Password.');
        return;
    }

    if (isSignupMode) {
        localStorage.setItem('savedUsername', username);
        localStorage.setItem('savedPassword', password);
        alert('Sign up successful! Now you can log in.');
        switchToLoginMode();
    } else {
        const savedUsername = localStorage.getItem('savedUsername');
        const savedPassword = localStorage.getItem('savedPassword');

        if (savedUsername === null || savedPassword === null) {
            alert('No account found. Please sign up first.');
            return;
        }

        if (username === savedUsername && password === savedPassword) {
            alert('Login successful!');
            window.location.href = 'home.html'; // redirect to main page
        } else {
            alert('Invalid credentials. Please try again.');
        }
    }
}

function areFieldsFilled(username, password) {
    return username !== "" && password !== "";
}

function toggleFormMode() {
    if (!isSignupMode) {
        switchToSignupMode();
    } else {
        switchToLoginMode();
    }
}

function switchToSignupMode() {
    isSignupMode = true;
    heading.textContent = 'Sign Up';
    loginSubmitButton.textContent = 'Sign Up';
    signupButton.textContent = 'Go to Login';
}

function switchToLoginMode() {
    isSignupMode = false;
    heading.textContent = 'Welcome';
    loginSubmitButton.textContent = 'Login';
    signupButton.textContent = 'Sign Up';
}

document.documentElement.style.fontSize = '16px'; 
