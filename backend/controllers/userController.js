const { findUserByEmail, createUser } = require('../models/userModel');

async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Directly comparing plain text passwords (NOT SECURE!)
    if (password !== user.password_hash) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // ✅ If you want to generate JWT in the future, here’s where you’d do it

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        preferred_currency: user.preferred_currency,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const registerUser = async (req, res) => {
  const { name, email, password, preferred_currency } = req.body;

  if (!name || !email || !password || !preferred_currency) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    // Storing plain text password (NOT SECURE!)
    const newUser = await createUser({
      name,
      email,
      passwordHash: password, // Storing plain password (not secure)
      preferredCurrency: preferred_currency,
    });

    return res.status(201).json({
      message: "User created successfully.",
      user: newUser,
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
