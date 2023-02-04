const Router = require('express');
const router = new Router();
const boxController = require('../controller/box.controller');
router.post('/box', boxController.createBox);
router.get('/box', boxController.getBoxesByUser);
router.put('/box', boxController.updateBox);
router.delete('/box/:id', boxController.deleteBox);
module.exports = router;