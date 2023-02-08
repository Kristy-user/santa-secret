const Router = require('express');
const router = new Router();
const accountController = require('../controller/account.controller');

router.patch('/account', accountController.updateAccount);
router.delete('/account/:id', accountController.deleteAccount);

module.exports = router;
