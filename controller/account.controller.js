const db = require('../db');

class AccountController {
  async createAccount(req, res) {
    const { userName, email } = req.body;
    const newUser = await db.query(
      `INSERT INTO account (user_name, email) values ($1, $2) RETURNING *`,
      [userName, email]
    );

    res.json(newUser.rows[0]);
  }
  async getAccounts(req, res) {
    const users = await db.query('SELECT * FROM account');
    res.json(users);
  }
  async getOneAccount(req, res) {
    const id = req.params.id;
    const account = await db.query(`SELECT * FROM account WHERE id = $1`, [id]);
    res.json(account.rows[0]);
  }
  // http://localhost:8080/api/account
  async updateAccount(req, res) {
    const { id, userName, email } = req.body;
    const account = await db.query(
      `UPDATE account set user_name = $1, email = $2 WHERE id =$3 RETURNING *`,
      [userName, email, id]
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
