const bcrypt = require('bcrypt');
const db = require('../db');
const jwt = require('jsonwebtoken');

function jwtGenerator(id) {
  const payload = {
    user: {
      id,
    },
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}
class LoginController {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await db.query('SELECT * FROM account WHERE email = $1', [
        email,
      ]);

      if (user.rows.length === 0) {
        return res.status(401).json('Invalid Credential');
      }

      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );

      if (!validPassword) {
        return res.status(401).json('Invalid Credential');
      }
      const jwtToken = jwtGenerator(user.rows[0].id);
      return res.json({ jwtToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server error');
    }
  }
}
module.exports = new LoginController();
