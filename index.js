require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// MongoDB connection
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.3kbu4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from appropriate directories
app.use(express.static(path.join(__dirname, 'LMS')));
app.use('/css', express.static(path.join(__dirname, '/css')));
app.use('/admin/js', express.static(path.join(__dirname, 'LMS', 'admin', 'js')));
app.use('/user/js', express.static(path.join(__dirname, 'LMS', 'user', 'js')));

// User Schema
const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    role: { type: String, default: 'user' }
});

// Admin Schema
const Admin = mongoose.model('Admin', {
    name: String,
    email: String,
    password: String,
    adminCode: String,
    role: { type: String, default: 'admin' }
});

// API Routes
app.post('/api/user/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send({ success: true });
    } catch (error) {
        res.status(400).send({ error: 'Signup failed' });
    }
});

app.post('/api/user/login', async (req, res) => {
    const user = await User.findOne(req.body);
    if (user) {
        res.send({ success: true });
    } else {
        res.status(400).send({ error: 'Login failed' });
    }
});

app.post('/api/admin/signup', async (req, res) => {
    try {
        const admin = new Admin(req.body);
        await admin.save();
        res.send({ success: true });
    } catch (error) {
        res.status(400).send({ error: 'Admin signup failed' });
    }
});

app.post('/api/admin/login', async (req, res) => {
    const admin = await Admin.findOne(req.body);
    if (admin) {
        res.send({ success: true });
    } else {
        res.status(400).send({ error: 'Admin login failed' });
    }
});

// Route handlers for HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// Add this route handler to your server.js
app.get('/admin/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'LMS', 'admin', 'signup.html'));
});

app.get('/admin/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'LMS', 'admin', 'login.html'));
});

app.get('/admin/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'LMS', 'admin', 'home.html'));
});

app.get('/user/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'LMS', 'user', 'login.html'));
});

app.get('/user/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'LMS', 'user', 'home.html'));
});

app.get('/user/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'LMS', 'user', 'signup.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Access the app at http://localhost:${port}`);
});