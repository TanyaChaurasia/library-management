document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const user = {
        name: document.getElementById('signup-name').value,
        email: document.getElementById('signup-email').value,
        password: document.getElementById('signup-password').value
    };
    
    if (user.password !== document.getElementById('signup-confirm').value) {
        alert('Passwords do not match!');
        return;
    }
    
    try {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        
        if (response.ok) {
            window.location.href = 'user/home.html';
        } else {
            alert('Signup failed');
        }
    } catch (error) {
        alert('Error during signup');
    }
});