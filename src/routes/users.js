const express = require('express');

const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/adduser', userCtrl.addUser);
router.post('/login', userCtrl.loginUser);


module.exports = router;
