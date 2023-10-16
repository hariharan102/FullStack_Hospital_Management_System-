// Function to handle successful login
function handleLoginSuccess(username) {
    // Hide the login form and show the dashboard
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('dashboard-container').style.display = 'flex';

    // Set the username in the dashboard
    document.getElementById('username').textContent = username;

    // Fetch the token number
    fetchTokenNumber();
}

// Function to handle failed login
function handleLoginFailure() {
    // Show an error message
    document.getElementById('login-error').textContent = 'Invalid email or password';
}

// Function to fetch the token number for the logged-in user
function fetchTokenNumber() {
    // Make a GET request to the back-end to fetch the token number
    fetch('/token', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function(response) {
        // Handle response from the back-end
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch token number');
        }
    })
    .then(function(data) {
        // Display the token number in the dashboard
        document.getElementById('token-number').textContent = data.tokenNumber;
    })
    .catch(function(error) {
        console.log('Error:', error);
    });
}

// Function to handle login form submission
function handleLoginFormSubmit(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Make a POST request to the back-end login endpoint
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(function(response) {
        // Handle response from the back-end
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to login');
        }
    })
    .then(function(data) {
        handleLoginSuccess(data.username);
    })
    .catch(function(error) {
        handleLoginFailure();
    });
}

// Function to create the login form
function createLoginForm() {
    var loginContainer = document.createElement('div');
    loginContainer.id = 'login-container';

    var loginHeading = document.createElement('h1');
    loginHeading.textContent = 'Login';
    loginContainer.appendChild(loginHeading);

    var loginForm = document.createElement('form');
    loginForm.id = 'login-form';

    var emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'email';
    emailInput.placeholder = 'Email';
    loginForm.appendChild(emailInput);

    var passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.placeholder = 'Password';
    loginForm.appendChild(passwordInput);

    var submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Login';
    loginForm.appendChild(submitButton);

    loginContainer.appendChild(loginForm);

    var loginError = document.createElement('p');
    loginError.id = 'login-error';
    loginContainer.appendChild(loginError);

    return loginContainer;
}

// Function to create the dashboard
function createDashboard(username) {
    var dashboardContainer = document.createElement('div');
    dashboardContainer.id = 'dashboard-container';

    var dashboardHeading = document.createElement('h1');
    dashboardHeading.textContent = 'Welcome, ' + username + '!';
    dashboardContainer.appendChild(dashboardHeading);

    var tokenNumberParagraph = document.createElement('p');
    tokenNumberParagraph.textContent = 'Your token number: ';
    var tokenNumberSpan = document.createElement('span');
    tokenNumberSpan.id = 'token-number';
    tokenNumberParagraph.appendChild(tokenNumberSpan);
    dashboardContainer.appendChild(tokenNumberParagraph);

    return dashboardContainer;
}

// Function to initialize the app
function initializeApp() {
    var appContainer = document.getElementById('app');

    // Check if the user is already logged in
    var isLoggedIn = false; // Replace with your logic to check if the user is logged in

    if (isLoggedIn) {
        // User is logged in, display the dashboard
        var username = 'John Doe'; // Replace with the username of the logged-in user
        var dashboard = createDashboard(username);
        appContainer.appendChild(dashboard);

        // Fetch the token number
        fetchTokenNumber();
    } else {
        // User is not logged in, display the login form
        var loginForm = createLoginForm();
        appContainer.appendChild(loginForm);

        // Add event listener for form submission
        document.getElementById('login-form').addEventListener('submit', handleLoginFormSubmit);
    }
}

// Initialize the app
initializeApp();
