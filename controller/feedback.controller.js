const db = require("../db");

class FeedbackController {
  async createFeedback(req, res) {
    try {
      const {rating, text, userName, userId} = req.body;
      const newFeedback = await db.query(
        `INSERT INTO feedback (rating, text, user_name, user_id) values ($1, $2, $3, $4 ) RETURNING *`,
        [rating, text, userName, userId]
      );
      res.json(newFeedback.rows[0]);
    } catch (e) {
      res.json({error: e.message});
      console.log(e);
    }
  }

  async getFeedbackByUser(req, res) {
    try {
      const id = req.params.id;
      const feedbacks = await db.query(
        `SELECT * FROM feedback WHERE user_id = $1`,
        [id]
      );
      res.json(feedbacks.rows);
    } catch (e) {
      res.json({error: e.message});
      console.log(e);
    }
  }

  async getAllFeedbacks(req, res) {
    try {
      const feedbacks = await db.query(`SELECT * FROM feedback`);
      res.json(feedbacks.rows);
    } catch (e) {
      res.json(e);
      console.log(e);
    }
  }

  async updateFeedback(req, res) {
    try {
      const {id, rating, text, userName, userId} = req.body;
      const feedback = await db.query(
        `UPDATE feedback set rating = $1, text = $2, user_name = $3,user_id = $4  WHERE id =$5 RETURNING *`,
        [rating, text, userName, userId, id]
      );
      if (!feedback.rowCount) {
        res.status(404).json({
          message: "Feedback with such ID is not found",
        });
      } else res.json(feedback.rows[0]);
    } catch (e) {
      res.json(e.detail);
      console.log(e);
    }
  }
  async deleteFeedback(req, res) {
    try {
      const id = req.params.id;
      const feedback = await db.query(`DELETE FROM feedback WHERE id = $1`, [
        id,
      ]);
      if (!feedback.rowCount) {
        res.status(404).json(`Feedback with ID = ${id} was not found`);
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

module.exports = new FeedbackController();
