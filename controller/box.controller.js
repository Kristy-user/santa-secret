const db = require('../db');

class BoxController {
  async createBox(req, res) {
    const { boxName, boxImg, year, invitedKey, cardsId, adminId } = req.body;
    const newBox = await db.query(
      `INSERT INTO box (box_name, box_img, year, invited_key, cards_id, admin_id) values ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [boxName, boxImg, year, invitedKey, cardsId, adminId]
    );
    res.json(newBox.rows[0]);
  }

  // santa-secret-clone.up.railway.app/box?id=1
  async getBoxesByUser(req, res) {
    const id = req.query.id;
    console.log(id);
    const boxes = await db.query(`SELECT * FROM box WHERE admin_id = $1`, [id]);
    res.json(boxes.rows);
  }
  async updateBox(req, res) {
    try {
      const { id, boxName, boxImg, year, invitedKey, cardsId, adminId } =
        req.body;
      const box = await db.query(
        `UPDATE box set box_name = $1, box_img = $2, year = $3,invited_key = $4, cards_id = $5, admin_id =$6  WHERE box_id =$7 RETURNING *`,
        [boxName, boxImg, year, invitedKey, cardsId, adminId, id]
      );
      res.json(box.rows[0]);
    } catch (e) {
      console.log(e);
    }
  }
  async deleteBox(req, res) {
    const id = req.params.id;
    console.log(id);
    const box = await db.query(`DELETE FROM "box" WHERE box_id = $1`, [id]);
    res.json(box.rows[0]);
  }
}

module.exports = new BoxController();
