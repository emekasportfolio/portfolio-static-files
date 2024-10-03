document.querySelector('#feedback-form').addEventListener('input', function() {
            const firstName = document.querySelector('input[name="first_name"]');
            const lastName = document.querySelector('input[name="last_name"]');
            const phone = document.querySelector('input[name="phone"]');
            const email = document.querySelector('input[name="email"]');
            const message = document.querySelector('textarea[name="message"]');
            const submitButton = document.getElementById('submit-button');

            // Validate fields
            const firstNameValid = /^[a-zA-Z]+$/.test(firstName.value);
            const lastNameValid = /^[a-zA-Z]+$/.test(lastName.value);
            const phoneValid = /^[0-9]+$/.test(phone.value);
            const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
            const messageValid = message.value.split(' ').length >= 5;

            // Set background colors for validation feedback
            firstName.style.backgroundColor = firstNameValid ? '' : 'red';
            lastName.style.backgroundColor = lastNameValid ? '' : 'red';
            phone.style.backgroundColor = phoneValid ? '' : 'red';
            email.style.backgroundColor = emailValid ? '' : 'red';
            message.style.backgroundColor = messageValid ? '' : 'red';

            // Enable/disable submit button
            submitButton.disabled = !(firstNameValid && lastNameValid && phoneValid && emailValid && messageValid);
        });

        function submitFeedback(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());

            fetch('/send-feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    document.getElementById('feedback-message').innerText = 'Thank you for your feedback!';
                    event.target.reset();
                    document.getElementById('submit-button').disabled = true; // Disable the button again
                } else {
                    document.getElementById('feedback-message').innerText = 'There was an error. Please try again.';
                }
            });
        }
