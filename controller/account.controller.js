const db = require("../db");
const bcrypt = require("bcrypt");

class AccountController {
  async updateAccount(req, res) {
    try {
      const {id, name, email, phonenumber, password} = req.body;
      const user = await db.query("SELECT * FROM account WHERE id = $1", [id]);
      const userByEmail = await db.query(
        "SELECT * FROM account WHERE email = $1",
        [email]
      );
      if (
        userByEmail.rows.length > 0 &&
        user.rows[0].id !== userByEmail.rows[0].id
      ) {
        return res.status(401).json("User with this email already exist!");
      }
      let bcryptPassword;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        bcryptPassword = await bcrypt.hash(password, salt);
      }
      const updateAccount = await db.query(
        `WITH used_parameters AS (
      SELECT $1, $2, $3, $4) UPDATE account set name = ${
        name !== undefined ? "$1" : "name"
      }, email = ${email !== undefined ? "$2" : "email"}, phonenumber = ${
          phonenumber !== undefined ? "$3" : "phonenumber"
        }, password = ${
          password !== undefined ? "$4" : "password"
        }  WHERE id =$5 RETURNING *`,
        [name, email, phonenumber, bcryptPassword, id]
      );
      if (!updateAccount.rowCount) {
        res.status(404).json({
          message: "Account with such ID is not found",
        });
      } else res.json(updateAccount.rows[0]);
    } catch (e) {
      res.json({error: e.message});
      console.log(e);
    }
  }

  async deleteAccount(req, res) {
    try {
      const id = req.params.id;
      const account = await db.query(`DELETE FROM account WHERE id = $1`, [id]);
      return res.json(account);
    } catch (e) {
      res.json({error: e.message});
      console.log(e);
    }
  }
}

module.exports = new AccountController();
