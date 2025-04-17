document.getElementById('adminSignupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const admin = {
        name: document.getElementById('admin-name').value,
        email: document.getElementById('admin-email').value,
        password: document.getElementById('admin-password').value,
        adminCode: document.getElementById('admin-code').value
    };
    
    try {
        const response = await fetch('/api/admins/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(admin)
        });
        
        if (response.ok) {
            window.location.href = 'admin/home.html';
        } else {
            alert('Admin signup failed');
        }
    } catch (error) {
        alert('Error during admin signup');
    }
});