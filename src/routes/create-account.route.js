const express = require('express')
const { createAccount, loginAccount } = require('../controllers/create-account.controller')//new add korchi.
const router = express.Router()

router.post('/account/create', createAccount);
router.post('/account/login', loginAccount)//  same

module.exports = router;