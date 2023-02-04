const express = require('express');
const db = require('../db');
const router = express.Router();
const registerController = require('../controller/register.controller');
const loginController = require('../controller/login.controller');
const authController = require('../middleware/auth');

router.get('/', authController.auth, async (req, res) => {
  try {
    const user = await db.query('SELECT * FROM account WHERE id = $1', [
      req.user.id,
    ]);
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/register', registerController.register);
router.post('/login', loginController.login);

module.exports = router;
