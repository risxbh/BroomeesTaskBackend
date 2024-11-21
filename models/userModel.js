const pool = require("../config/db");

// Fetch all users
const getUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM user");
  return rows;
};

// Create a new user
const createUser = async (userData) => {
  const { firstName, lastName, email, username, password } = userData;
  const sql = `INSERT INTO user (firstName, lastName, email, username, password)
                 VALUES (?, ?, ?, ?, ?)`;
  const [result] = await pool.query(sql, [
    firstName,
    lastName,
    email,
    username,
    password,
  ]);
  return result;
};

module.exports = {
  getUsers,
  createUser,
};
