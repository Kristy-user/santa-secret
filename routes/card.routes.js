const Router = require('express');
const router = new Router();
const cardController = require('../controller/card.controller');
router.post('/card', cardController.createCard);
router.get('/card', cardController.getCardsByBox);
router.patch('/card', cardController.updateCard);
router.delete('/card/:id', cardController.deleteCard);
module.exports = router;
