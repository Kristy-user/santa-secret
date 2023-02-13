const db = require('../db');

class CardController {
  async createCard(req, res) {
    const { userName, wardId, cardImg, randomKey, wishes, boxId, userId } = req.body;
    const newCard = await db.query(
      `INSERT INTO card (user_name, ward_id, card_img, random_key, wishes, box_id) values ($1, $2, $3, $4, $5, $6. $7 ) RETURNING *`,
      [userName, wardId, cardImg, randomKey, wishes, boxId,userId ]
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
      const { id, userName, wardId, cardImg, randomKey, wishes, boxId, userId } =
        req.body;
      const card = await db.query(
        `WITH used_parameters AS (
          SELECT $1, $2::integer, $3, $4, $5, $6::integer, $7::integer) UPDATE card set user_name = ${
            userName !== undefined ? "$1" : "user_name"
          }, ward_id = ${
            wardId !== undefined ? "$2" : "ward_id"
          }, card_img = ${
            cardImg !== undefined ? "$3" : "card_img"
          },random_key = ${
            randomKey !== undefined ? "$4" : "random_key"
          }, wishes = ${
            wishes !== undefined ? "$5" : "wishes"
          }, box_id =${
            boxId !== undefined ? "$6" : "box_id"
          }, user_id = ${
           userId !== undefined ? "$7" : "user_id"
          }  WHERE card_id =$8 RETURNING *`,
        [userName, wardId, cardImg, randomKey, wishes, boxId, userId ,id]
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
