const db = require('../db');

class BoxController {
  async createBox(req, res) {
    const { boxName, boxImg, year, invitedKey, cardsId, adminId, isDraw  } = req.body;
    const newBox = await db.query(
      `INSERT INTO box (box_name, box_img, year, invited_key, cards_id, admin_id, is_draw) values ($1, $2, $3, $4, $5, $6, $7 ) RETURNING *`,
      [boxName, boxImg, year, invitedKey, cardsId, adminId,isDraw ]
    );
    res.json(newBox.rows[0]);
  }

  async getBoxesById(req, res) {
    const idBox = req.query.id 
    const idAdmin = req.query.admin;
    const boxes = idBox ? await db.query(`SELECT * FROM box WHERE box_id = $1`, [idBox]) : idAdmin ? await db.query(`SELECT * FROM box WHERE admin_id = $1`, [idAdmin]) : [];
    res.json(boxes.rows);
  }
  async getBoxesByKey(req, res) {
    const key = req.params.key;
    const boxes = await db.query(`SELECT * FROM box WHERE invited_key = $1`, [key]);
    res.json(boxes.rows[0]);
  }
  async updateBox(req, res) {
    try {
      const { id, boxName, boxImg, year, invitedKey, cardsId, adminId,isDraw } =
        req.body;
      const box = await db.query(
        `UPDATE box set box_name = $1, box_img = $2, year = $3,invited_key = $4, cards_id = $5, admin_id =$6, is_draw = $7  WHERE box_id =$8 RETURNING *`,
        [boxName, boxImg, year, invitedKey, cardsId, adminId, isDraw ,id]
      );
      res.json(box.rows[0]);
    } catch (e) {
      console.log(e);
    }
  }
  async deleteBox(req, res) {
    const id = req.params.id;
    const box = await db.query(`DELETE FROM "box" WHERE box_id = $1`, [id]);
    res.json(box.rows[0]);
  }
}

module.exports = new BoxController();
