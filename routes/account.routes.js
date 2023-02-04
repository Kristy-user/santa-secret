const Router = require('express');
const router = new Router();
const accountController = require('../controller/account.controller');

router.put('/account', accountController.updateAccount);
router.delete('/account/:id', accountController.deleteAccount);

module.exports = router;
