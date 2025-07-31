function randomBetween(a, b) {
    return a + Math.random() * (b - a);
}
function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.setProperty('--start', Math.random());
    star.style.setProperty('--end', randomBetween(0.2, 1));
    star.style.animationDuration = randomBetween(1.8, 3.6) + 's';
    document.body.appendChild(star);
    setTimeout(() => document.body.removeChild(star), 3800);
}
setInterval(createStar, 420);


// === Contact Form Handling ===
document.addEventListener('DOMContentLoaded', function() {
    // FORM HANDLING
    const form = document.getElementById('userForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form values and trim whitespace
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const statusDiv = document.getElementById('formStatus');

            // Simple validation
            if (!name || !email || !message) {
                statusDiv.textContent = 'Please fill out all fields.';
                statusDiv.style.color = 'red';
                return;
            }

            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                statusDiv.textContent = 'Please enter a valid email address.';
                statusDiv.style.color = 'red';
                return;
            }

            // Prepare payload to send
            const payload = { name, email, message };

            try {
                // Call your AWS API Gateway POST endpoint here (DO NOT change API)
                const response = await fetch('https://s9bzfqke59.execute-api.ap-south-1.amazonaws.com/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    statusDiv.textContent = 'Submitted successfully!';
                    statusDiv.style.color = 'green';
                    form.reset(); // Clear form fields
                } else {
                    const errorData = await response.json();
                    statusDiv.textContent = `Submission failed: ${errorData.message || 'Unknown error'}`;
                    statusDiv.style.color = 'red';
                }
            } catch (error) {
                statusDiv.textContent = 'Submission failed: Network or server error.';
                statusDiv.style.color = 'red';
                console.error('Error submitting form:', error);
            }
        });
    }
});
