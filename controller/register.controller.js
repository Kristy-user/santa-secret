const bcrypt = require("bcrypt");
const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

class RegisterController {
  async register(req, res) {
    try {
      const {name, email, phonenumber, password} = req.body;
      const user = await db.query("SELECT * FROM account WHERE email = $1", [
        email,
      ]);
      if (user.rows.length > 0) {
        return res.status(401).json("User already exist!");
      }
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
      let newUser = await db.query(
        "INSERT INTO account (name, email, phonenumber, password) VALUES ($1, $2, $3,$4) RETURNING *",
        [name, email, phonenumber, bcryptPassword]
      );
      const jwtToken = jwtGenerator(newUser.rows[0].id);
      console.log(newUser.rows[0]);
      return res
        .status(200)
        .json({
          id: newUser.rows[0].id,
          name: newUser.rows[0].name,
          email: newUser.rows[0].email,
          phonenumber: newUser.rows[0].phonenumber,
          jwtToken,
        });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error", err);
    }
  }
}
module.exports = new RegisterController();
