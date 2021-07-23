const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users');

router.post('/signup', UsersController.userSignUp);

router.post('/login', UsersController.userLogin);

router.delete('/:id', UsersController.userDelete);

module.exports = router;
