const db = require("../db");

class CardController {
  async createCard(req, res) {
    try {
      const {
        userName,
        wardId,
        cardImg,
        wishes,
        boxId,
        userId,
        phone,
        wardGift,
        cardGift,
        email,
      } = req.body;
      const newCard = await db.query(
        `INSERT INTO card (user_name, ward_id, card_img, wishes, box_id, user_id, phone, ward_gift, card_gift) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 ) RETURNING *`,
        [
          userName,
          wardId,
          cardImg,
          wishes,
          boxId,
          userId,
          phone,
          wardGift,
          cardGift,
          email,
        ]
      );
      res.json(newCard.rows[0]);
    } catch (e) {
      res.json({error: e.message});
      console.log(e);
    }
  }

  async getCardsByBox(req, res) {
    try {
      const id = req.query.id;
      const cards = await db.query(`SELECT * FROM card WHERE box_id = $1`, [
        id,
      ]);
      res.json(cards.rows);
    } catch (e) {
      res.json(e);
      console.log(e);
    }
  }
  async updateCard(req, res) {
    try {
      const {
        id,
        userName,
        wardId,
        cardImg,
        wishes,
        boxId,
        userId,
        phone,
        wardGift,
        cardGift,
        email,
      } = req.body;
      const card = await db.query(
        `WITH used_parameters AS (
          SELECT $1, $2::integer, $3, $4, $5::integer, $6::integer, $7, $8::boolean, $9::boolean, $10) UPDATE card set user_name = ${
            userName !== undefined ? "$1" : "user_name"
          }, ward_id = ${wardId !== undefined ? "$2" : "ward_id"}, card_img = ${
          cardImg !== undefined ? "$3" : "card_img"
        }, wishes = ${wishes !== undefined ? "$4" : "wishes"}, box_id =${
          boxId !== undefined ? "$5" : "box_id"
        }, user_id = ${userId !== undefined ? "$6" : "user_id"}, phone = ${
          phone !== undefined ? "$7" : "phone"
        }, ward_gift = ${
          wardGift !== undefined ? "$8" : "ward_gift"
        }, card_gift = ${
          cardGift !== undefined ? "$9" : "card_gift"
        }, email = ${
          email !== undefined ? "$10" : "email"
        }  WHERE card_id =$11 RETURNING *`,
        [
          userName,
          wardId,
          cardImg,
          wishes,
          boxId,
          userId,
          phone,
          wardGift,
          cardGift,
          email,
          id,
        ]
      );

      if (!card.rowCount) {
        res.status(404).json({
          message: "Card with such ID is not found",
        });
      } else res.json(card.rows[0]);
    } catch (e) {
      res.json(e.detail);
      console.log(e);
    }
  }
  async deleteCard(req, res) {
    try {
      const id = req.params.id;
      const card = await db.query(`DELETE FROM card WHERE card_id = $1`, [id]);
      if (!card.rowCount) {
        res.status(404).json(`Card with ID = ${id} was not found`);
      } else
        res.status(204).json({
          status: "success",
          data: null,
        });
    } catch (e) {
      res.send(e.message);
    }
  }
}

module.exports = new CardController();
