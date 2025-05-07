const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/', accountController.getAccounts);           // /accounts?user_id=123
router.post('/', accountController.createAccount);        // body: { user_id, name, balance, type }
router.delete('/:id', accountController.removeAccount);   // /accounts/:id?user_id=123

module.exports = router;
