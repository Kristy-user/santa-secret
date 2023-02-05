const Router = require('express');
const router = new Router();
const userBoxesController = require('../controller/userBoxes.controller');
router.post('/user-boxes', userBoxesController.createBox);
router.get('/user-boxes', userBoxesController.getBoxesByUser);
router.put('/user-boxes', userBoxesController.updateBoxes);
router.delete('/user-boxes/:id', userBoxesController.deleteUserBoxes);
module.exports = router;
