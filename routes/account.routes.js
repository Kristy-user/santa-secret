const Router = require('express');
const router = new Router();
const accountController = require('../controller/account.controller');
router.post('/account', accountController.createAccount);
router.get('/account', accountController.getAccounts);
router.get('/account/:id', accountController.getOneAccount);
router.put('/account', accountController.updateAccount);
router.delete('/account/:id', accountController.deleteAccount);

module.exports = router;
