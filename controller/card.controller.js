const db = require('../db');

class CardController {
  async createCard(req, res) {
    const { userName, wardId, cardImg, randomKey, wishes, boxId } = req.body;
    const newCard = await db.query(
      `INSERT INTO card (user_name, ward_id, card_img, random_key, wishes, box_id) values ($1, $2, $3, $4, $5, $6 ) RETURNING *`,
      [userName, wardId, cardImg, randomKey, wishes, boxId ]
    );
    res.json(newCard.rows[0]);
  }

   async getCardsByBox(req, res) {
    const id = req.query.id;
    const cards = await db.query(`SELECT * FROM card WHERE box_id = $1`, [id]);
    res.json(cards.rows);
  }
  async updateCard(req, res) {
    try {
      const { id, userName, wardId, cardImg, randomKey, wishes, boxId } =
        req.body;
      const card = await db.query(
        `UPDATE card set user_name = $1, ward_id = $2, card_img = $3,random_key = $4, wishes = $5, box_id =$6  WHERE card_id =$7 RETURNING *`,
        [userName, wardId, cardImg, randomKey, wishes, boxId ,id]
      );
      res.json(card.rows[0]);
    } catch (e) {
      console.log(e);
    }
  }
  async deleteCard(req, res) {
    const id = req.params.id;
    const card = await db.query(`DELETE FROM card WHERE card_id = $1`, [id]);
    res.json(card.rows[0]);
  }
}

module.exports = new CardController();
