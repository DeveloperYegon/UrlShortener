// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const users = [
  { id: 1, username: 'student1', password: 'password123', role: 'student' },
  { id: 2, username: 'instructor1', password: 'password123', role: 'instructor' },
];

// Simple JWT authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'SECRET_KEY', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.sendStatus(401);

  const accessToken = jwt.sign({ username: user.username, role: user.role }, 'SECRET_KEY');
  res.json({ accessToken });
});

// Example protected route
app.get('/dashboard', authenticateToken, (req, res) => {
  if (req.user.role === 'student') {
    res.send('Welcome to the student dashboard!');
  } else if (req.user.role === 'instructor') {
    res.send('Welcome to the instructor dashboard!');
  } else {
    res.sendStatus(403);
  }
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
