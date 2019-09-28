const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');
const messageController = require('../controllers/messages');

router.get('/login', userController.userLogin);
router.post('/createUser', userController.createUser);
router.post('/sendMessage', messageController.createMessage);
router.get('/messages', messageController.getMessagesOfSenderAndReceiver);

module.exports = router;