const express = require('express')
const { createAccount } = require('../controllers/create-account.controller.js')


const router = express.Router()

router.post('/account/create', createAccount);

module.exports = router;