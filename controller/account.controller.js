const db = require('../db');
const bcrypt = require('bcrypt');

class AccountController {
  async updateAccount(req, res) {
    const {id, name, email, phonenumber, password} = req.body;
    const user = await db.query("SELECT * FROM account WHERE id = $1", [id]);
    const userByEmail = await db.query(
      "SELECT * FROM account WHERE email = $1",
      [email]
    );
    console.log(userByEmail.rows);
    if (
      userByEmail.rows.length > 0 &&
      user.rows[0].id !== userByEmail.rows[0].id
    ) {
      return res.status(401).json("User with this email already exist!");
    }
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
    const updateAccount = await db.query(
      `UPDATE account set name = $1, email = $2, phonenumber = $3, password = $4  WHERE id =$5 RETURNING *`,
      [name, email, phonenumber, bcryptPassword, id]
    );
   res.json(updateAccount.rows[0]);
  }
 
  async deleteAccount(req, res) {
    const id = req.params.id;
    const account = await db.query(`DELETE FROM account WHERE id = $1`, [id]);
    return res.json(account);
  }
}

module.exports = new AccountController();
