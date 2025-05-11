const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000; // ✅ Works on Render or local

app.use(cors());
app.use(express.json());

// ✅ REGISTER route
app.post('/register', async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)`,
    [fullName, email, hashedPassword],
    function (err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ message: 'Email already exists.' });
        }
        return res.status(500).json({ message: 'Server error.' });
      }

      res.status(201).json({ message: 'User registered successfully.' });
    }
  );
});

// ✅ LOGIN route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) return res.status(500).json({ message: 'Server error.' });
    if (!user) return res.status(400).json({ message: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

    res.status(200).json({
      message: 'Login successful!',
      user: { fullName: user.fullName, email: user.email },
    });
  });
});

/**
 * REQUEST PASSWORD RESET
 */
app.post('/request-reset', (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required.' });

  const token = crypto.randomBytes(20).toString('hex');

  db.run(
    `UPDATE users SET resetToken = ? WHERE email = ?`,
    [token, email],
    function (err) {
      if (err) return res.status(500).json({ message: 'Server error.' });
      if (this.changes === 0) return res.status(404).json({ message: 'Email not found.' });

      // In real implementation, send this via email
      res.status(200).json({ message: 'Reset token generated.', token });
    }
  );
});

/**
 * RESET PASSWORD
 */
app.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token and new password are required.' });
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  db.run(
    `UPDATE users SET password = ?, resetToken = NULL WHERE resetToken = ?`,
    [hashed, token],
    function (err) {
      if (err) return res.status(500).json({ message: 'Server error.' });
      if (this.changes === 0) return res.status(400).json({ message: 'Invalid or expired token.' });

      res.status(200).json({ message: 'Password reset successful.' });
    }
  );
});

/**
 * START SERVER
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});