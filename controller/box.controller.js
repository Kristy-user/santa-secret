const db = require("../db");

class BoxController {
  async createBox(req, res) {
    const {boxName, boxImg, year, invitedKey, cardsId, adminId, isDraw, adminName} =
      req.body;
    const newBox = await db.query(
      `INSERT INTO box (box_name, box_img, year, invited_key, cards_id, admin_id, is_draw, admin_name) values ($1, $2, $3, $4, $5, $6, $7, $8 ) RETURNING *`,
      [boxName, boxImg, year, invitedKey, cardsId, adminId, isDraw, adminName]
    );
    res.json(newBox.rows[0]);
  }

  async getBoxesById(req, res) {
    const idBox = req.query.id;
    const idAdmin = req.query.admin;
    const boxes = idBox
      ? await db.query(`SELECT * FROM box WHERE box_id = $1`, [idBox])
      : idAdmin
      ? await db.query(`SELECT * FROM box WHERE admin_id = $1`, [idAdmin])
      : [];
    res.json(boxes.rows);
  }
  async getBoxesByKey(req, res) {
    const key = req.params.key;
    const boxes = await db.query(`SELECT * FROM box WHERE invited_key = $1`, [
      key,
    ]);
    res.json(boxes.rows[0]);
  }

  async updateBox(req, res) {
    try {
      const {id, boxName, boxImg, year, invitedKey, cardsId, adminId, isDraw, adminName} =
        req.body;
      console.log(
        id, boxName, boxImg, year, invitedKey, cardsId, adminId, isDraw, adminName
      );
      const box = await db.query(
        `WITH used_parameters AS (
        SELECT $1, $2, $3, $4, $5::integer[], $6::integer, $7::boolean, $8) UPDATE box set box_name = ${
          boxName !== undefined ? '$1' : 'box_name'
        }, box_img =  ${boxImg !== undefined ? '$2' : 'box_img'}, year = ${
          year !== undefined ? '$3' : 'year'
        },invited_key = ${
          invitedKey !== undefined ? '$4' : 'invited_key'
        }, cards_id = ${cardsId !== undefined ? '$5' : 'cards_id'}, admin_id =${
          adminId !== undefined ? '$6' : 'admin_id'
        }, is_draw = ${
          isDraw !== undefined ? '$7' : 'is_draw'
        }, admin_name = ${
          adminName !== undefined ? '$8' : 'admin_name'
        }   WHERE box_id =$9 RETURNING *`,
        [boxName, boxImg, year, invitedKey, cardsId, adminId, isDraw, adminName, id]
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
