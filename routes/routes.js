const express = require('express');
const users = require('./controllers/users');

const router = express.Router();

router.get('/users', users.getUsers);
router.get(
	'/users/:userId',
	users.getSingleUserValidation,
	users.getSingleUser
);
router.get('/profile', users.getProfile);
router.post('/users', users.addUserValidation, users.addUser);
router.delete('/users/:userId', users.deleteUser);

module.exports = router;
