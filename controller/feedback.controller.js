const db = require('../db');

class FeedbackController {
  async createFeedback(req, res) {
    const { rating, text, userName, userId  } = req.body;
    const newFeedback = await db.query(
      `INSERT INTO feedback (rating, text, user_name, user_id) values ($1, $2, $3, $4 ) RETURNING *`,
      [rating, text, userName, userId ]
    );
    res.json(newFeedback.rows[0]);
  }

   async getFeedbackByUser(req, res) {
    const id = req.params.id;
    const feedbacks = await db.query(`SELECT * FROM feedback WHERE user_id = $1`, [id]);
    res.json(feedbacks.rows);
  }
  async getAllFeedbacks(req, res) {
       const feedbacks = await db.query(`SELECT * FROM feedback`);
    res.json(feedbacks.rows);
  }

  async updateFeedback(req, res) {
    try {
      const { id,rating, text, userName, userId } =
        req.body;
      const feedback = await db.query(
        `UPDATE feedback set rating = $1, text = $2, user_name = $3,user_id = $4  WHERE id =$5 RETURNING *`,
        [rating, text, userName, userId ,id]
      );
      res.json(feedback.rows[0]);
    } catch (e) {
      console.log(e);
    }
  }
  async deleteFeedback(req, res) {
    const id = req.params.id;
    const feedback = await db.query(`DELETE FROM feedback WHERE id = $1`, [id]);
    res.json(feedback.rows[0]);
  }
}

module.exports = new FeedbackController();
