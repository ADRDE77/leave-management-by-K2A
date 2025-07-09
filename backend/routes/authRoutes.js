// Inside routes/authRoutes.js
console.log("✅ authRoutes is loaded");


const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

// ✅ Register Route
router.post('/register', async (req, res) => {
  const { name, email, password, role} = req.body;  // ✅ allow role
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
     role: role ?role:"employee"  // ✅ default to employee if not provided
    });

    await newUser.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// 🔹 Login Route
router.post('/login', async (req, res) => {
  console.log('Login hit:', req.body);

  const { email, password } = req.body;

  console.log('Login attempt:', email, password);

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      console.log('Login failed: user not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log(`Password match for ${email}:`, isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'yoursecret',
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// GET /api/admin/view-staff
router.get('/view-staff', async (req, res) => {
  try {
    const staff = await User.find({ role: { $ne: 'admin' } }).select('-password');
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch staff' });
  }
});


module.exports = router;
