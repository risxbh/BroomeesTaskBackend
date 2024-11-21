const bcrypt = require("bcrypt");
const pool = require("../config/db");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists by username
    const [rows] = await pool.query("SELECT * FROM user WHERE username = ?", [
      username,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({
        errors: [{ key: "username", message: "Username not found" }],
      });
    }

    const user = rows[0];

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        errors: [{ key: "password", message: "Invalid password" }],
      });
    }

    // Respond without token, just user info
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error during login", error: err.message });
  }
};

module.exports = { login };
