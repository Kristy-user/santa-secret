const db = require("../db");

class UserBoxesController {
  async createBox(req, res) {
    try {
      const {userBoxes, accountId} = req.body;
      const newBox = await db.query(
        `INSERT INTO "user-boxes" (user_boxes, account_id) values ($1, $2) RETURNING *`,
        [userBoxes, accountId]
      );
      res.json(newBox.rows[0]);
    } catch (e) {
      res.json({error: e.message});
      console.log(e);
    }
  }

  async updateBoxes(req, res) {
    try {
      const {id, userBoxes, accountId} = req.body;
      const boxes = await db.query(
        `UPDATE "user-boxes" set  user_boxes=$1, account_id=$2 WHERE id =$3 RETURNING *`,
        [userBoxes, accountId, id]
      );
      return res.json(boxes.rows[0]);
    } catch (e) {
      console.log(e);
    }
  }

  async getBoxesByUser(req, res) {
    try {
      const id = req.params.id;
      const userBoxes = await db.query(
        `SELECT * FROM "user-boxes" WHERE account_id = $1`,
        [id]
      );
      res.json(userBoxes.rows);
    } catch (e) {
      res.json({error: e.message});
      console.log(e);
    }
  }

  async deleteUserBoxes(req, res) {
    try {
      const id = req.params.id;
      const userBoxes = await db.query(
        `DELETE FROM "user-boxes" WHERE id = $1`,
        [id]
      );
      res.json(userBoxes.rows[0]);
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = new UserBoxesController();
