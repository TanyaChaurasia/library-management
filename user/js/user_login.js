document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const credentials = {
        email: document.getElementById('user-email').value,
        password: document.getElementById('user-password').value
    };
    
    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        
        if (response.ok) {
            window.location.href = 'user/home.html';
        } else {
            alert('Login failed');
        }
    } catch (error) {
        alert('Error during login');
    }
});