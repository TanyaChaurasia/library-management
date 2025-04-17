document.getElementById('adminLoginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const credentials = {
        email: document.getElementById('admin-email').value,
        password: document.getElementById('admin-password').value
    };
    
    try {
        const response = await fetch('/api/admins/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        
        if (response.ok) {
            window.location.href = 'admin/home.html';
        } else {
            alert('Admin login failed');
        }
    } catch (error) {
        alert('Error during admin login');
    }
});