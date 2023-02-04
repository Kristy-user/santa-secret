const db = require('../db');
const bcrypt = require('bcrypt');
class AccountController {

  async updateAccount(req, res) {
    const { id, name, email, phonenumber, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
    const account = await db.query(
      `UPDATE account set name = $1, email = $2,phonenumber = $3, password = $4  WHERE id =$5 RETURNING *`,
      [name, email, phonenumber, bcryptPassword, id]
    );
    res.json(account.rows[0]);
  }
 
  async deleteAccount(req, res) {
    const id = req.params.id;
    const account = await db.query(`DELETE FROM account WHERE id = $1`, [id]);
    res.json(account.rows[0]);
  }
}

module.exports = new AccountController();
