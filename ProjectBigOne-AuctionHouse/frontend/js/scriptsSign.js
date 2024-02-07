const container = document.getElementById('container_sign');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const loginInvalidElement = document.querySelector('.login_invalid');
const registerInvalidElement = document.querySelector('.register_invalid');


registerBtn.addEventListener('click', () => {
    container.classList.add("active");
    if (loginInvalidElement) {
        loginInvalidElement.style.display = 'none';
    }
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
    if (registerInvalidElement) {
        registerInvalidElement.style.display = 'none';
    }
});

// Update this URL to match your backend URL and port
const apiUrl = 'http://127.0.0.1:3000';

// Example function to register a new user
document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');
    const registerSubmitButton = document.getElementById('registerSubmit');

    registerSubmitButton.addEventListener('click', () => {
        if(validateForm()){
            registerUser();
        console.log("Button Click");
        }
    });

    function validateForm() {
        const registerForm = document.forms["yourFormName"];  // Replace "yourFormName" with the actual name of your form
        const nameInput = registerForm.querySelector('[name="name"]');
        const lastnameInput = registerForm.querySelector('[name="lastname"]');
        const email = registerForm.querySelector('[name="email"]').value;
        const password = registerForm.querySelector('[name="password"]').value;

        console.log(nameInput.value + " " + lastnameInput.value + " " + email + " " + password);

        // Simple validation for other fields
        if (!nameInput.value || !lastnameInput.value || !email || !password) {
            alert('All fields are required');
            return false;
        }

        // Check if name contains only letters
        const name = nameInput.value;
        if (!/^[a-zA-Z]+$/.test(name)) {
            alert('Name should contain only letters');
            nameInput.focus();
            return false;
        }

        // Check if lastname contains only letters
        const lastname = lastnameInput.value;
        if (!/^[a-zA-Z]+$/.test(lastname)) {
            alert('Last name should contain only letters');
            lastnameInput.focus();
            return false;
        }

        return true;
    }

    function registerUser() {
        const formData = new FormData(registerForm);

        const userData = {
            name: formData.get('name'),
            lastname: formData.get('lastname'),
            email: formData.get('email'),
            password: formData.get('password'),
        };

        console.log('Sending data:', userData);

        fetch(`${apiUrl}/user`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
      })
      .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
            return response.json();
        })
        .then(data => {
            console.log('User added successfully:', data);
            // Handle success, if needed
        })
        .catch(error => {
            console.error('Error adding user:', error);
            // Handle error, show error message to the user, etc.
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const loginSubmitButton = document.getElementById('loginSubmit');


  loginSubmitButton.addEventListener('click', (event) => {
      loginUser(event);
  });

  function loginUser(event) {
        event.preventDefault();
   
        console.log('Login button clicked');
      const formData = new FormData(loginForm);
      

      const userData = {
          email: formData.get('email'),
          password: formData.get('password'),
      };

      console.log('Sending login data:', userData);

      fetch(`${apiUrl}/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Invalid email or password');
          }
          return response.text();
      })
      .then(data => {
          console.log('Login successful:', data);
          if (loginInvalidElement) {
            loginInvalidElement.style.display = 'none';
        }
      })
      .catch(error => {
          console.error('Login error:', error.message);
          if (loginInvalidElement) {
            loginInvalidElement.style.display = 'block';
        }
      });
  }
});

