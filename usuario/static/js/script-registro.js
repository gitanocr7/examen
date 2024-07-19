document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#form');
    const username = document.querySelector('#username');
    const firstName = document.querySelector('#first_name');
    const lastName = document.querySelector('#last_name');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirm_password');
    const successMessage = document.querySelector('#successMessage');

    form.addEventListener('submit', (e) => {
        if (!validateInputs()) {
            e.preventDefault();
        } else {
            showSuccessMessage();
            setTimeout(() => {
                form.submit();
            }, 2000);
        }
    });

    function showSuccessMessage() {
        successMessage.style.display = 'block';
    }

    function validateInputs() {
        let success = true;

        if (!validateInput(username)) success = false;
        if (!validateInput(firstName)) success = false;
        if (!validateInput(lastName)) success = false;
        if (!validateInput(email)) success = false;
        if (!validateInput(password)) success = false;
        if (!validateInput(confirmPassword)) success = false;

        return success;
    }

    function validateInput(input) {
        const value = input.value.trim();
        let success = true;

        if (input === username) {
            if (value === '') {
                setError(input, 'El nombre de usuario es necesario.');
                success = false;
            } else {
                setSuccess(input);
            }
        } else if (input === firstName) {
            if (value === '') {
                setError(input, 'El nombre es necesario.');
                success = false;
            } else if (value.length < 3) {
                setError(input, 'El nombre debe tener 3 caracteres mínimo.');
                success = false;
            } else {
                setSuccess(input);
            }
        } else if (input === lastName) {
            if (value === '') {
                setError(input, 'El apellido es necesario.');
                success = false;
            } else if (value.length < 3) {
                setError(input, 'El apellido debe tener 3 caracteres mínimo.');
                success = false;
            } else {
                setSuccess(input);
            }
        } else if (input === email) {
            if (value === '') {
                setError(input, 'El email es necesario.');
                success = false;
            } else if (!validateEmail(value)) {
                setError(input, 'Por favor, ingrese un email válido.');
                success = false;
            } else {
                setSuccess(input);
            }
        } else if (input === password) {
            if (value === '') {
                setError(input, 'La contraseña es necesaria.');
                success = false;
            } else if (value.length < 6) {
                setError(input, 'La contraseña debe tener 6 caracteres mínimo.');
                success = false;
            } else {
                setSuccess(input);
            }
            checkStrength(value);
        } else if (input === confirmPassword) {
            if (value === '') {
                setError(input, 'Debe confirmar su contraseña.');
                success = false;
            } else if (value !== password.value.trim()) {
                setError(input, 'Las contraseñas no coinciden.');
                success = false;
            } else {
                setSuccess(input);
            }
        }

        return success;
    }

    function setError(element, message) {
        const inputGroup = element.parentElement;
        const errorElement = inputGroup.querySelector('.error');

        errorElement.innerText = message;
        inputGroup.classList.add('error');
        inputGroup.classList.remove('success');
    }

    function setSuccess(element) {
        const inputGroup = element.parentElement;
        const errorElement = inputGroup.querySelector('.error');

        errorElement.innerText = '';
        inputGroup.classList.add('success');
        inputGroup.classList.remove('error');
    }

    function validateEmail(email) {
        return String(email)
            .toLowerCase()
            .match(
                /^[A-Za-z._\-0-9]+@[A-Za-z]+\.[a-z]{2,}$/
            );
    }

    function checkStrength(password) {
        var strengthBar = document.getElementById("strengthBar");
        var weakBar = document.getElementById("weak");
        var mediumBar = document.getElementById("medium");
        var strongBar = document.getElementById("strong");

        var length = password.length;

        if (length >= 1) {
            strengthBar.style.display = "block";
        } else {
            strengthBar.style.display = "none";
            return;
        }

        if (length < 6) {
            weakBar.style.width = "33%";
            mediumBar.style.width = "0%";
            strongBar.style.width = "0%";
        } else if (length >= 6 && length < 10) {
            weakBar.style.width = "33%";
            mediumBar.style.width = "66%";
            strongBar.style.width = "0%";
        } else {
            weakBar.style.width = "33%";
            mediumBar.style.width = "33%";
            strongBar.style.width = "100%";
        }
    }

    username.addEventListener('input', () => validateInput(username));
    firstName.addEventListener('input', () => validateInput(firstName));
    lastName.addEventListener('input', () => validateInput(lastName));
    email.addEventListener('input', () => validateInput(email));
    password.addEventListener('input', () => validateInput(password));
    confirmPassword.addEventListener('input', () => validateInput(confirmPassword));
});
