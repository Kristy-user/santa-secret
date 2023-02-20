const db = require("../db");

class NoticeController {
  async createNotice(req, res) {
    const {box, card, userId} = req.body;
    const newNotice = await db.query(
      `INSERT INTO notice (box, card, user_id) values ($1, $2, $3) RETURNING *`,
      [box, card, userId]
    );
    res.json(newNotice.rows[0]);
  }

  async getNoticeByUser(req, res) {
    const id = req.params.id;
    const notices = await db.query(`SELECT * FROM notice WHERE id = $1`, [id]);
    res.json(notices.rows[0]);
  }
  async updateNotice(req, res) {
    try {
      const {id, box, card, userId} = req.body;
      const notice = await db.query(
        `WITH used_parameters AS (
          SELECT $1::integer[], $2::integer[], $3::integer) UPDATE notice set box = ${
            box !== undefined ? "$1" : "box"
          }, card = ${card !== undefined ? "$2" : "card"}, user_id = ${
          userId !== undefined ? "$3" : "user_id"
        }  WHERE id =$4 RETURNING *`,
        [box, card, userId, id]
      );
      res.json(notice.rows[0]);
    } catch (e) {
      console.log(e);
    }
  }
  async deleteNotice(req, res) {
    const id = req.params.id;
    const notice = await db.query(`DELETE FROM notice WHERE id = $1`, [id]);
    res.json(notice.rows[0]);
  }
}

module.exports = new NoticeController();
