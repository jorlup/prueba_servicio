const Debug = require('debug');
const Users = require('../db/models').User;
const { getSignedToken } = require("../helpers/security");

const addUser = async (user) => {
	const debug = Debug('app:api:users');
	debug('addUser:start');
	const items = await Users.create(user);
	const token = await getSignedToken({user_id: items.id});
	debug('addUser:end');
	return { accessToken: token, user: items };
}

const getUserById = async id => Users.findOne({where: {id}});

const getUsers = async () => Users.findAll();

const deleteUser = async id => Users.destroy({where: {id}});

module.exports = {
	getUsers,
    addUser,
    getUserById,
	deleteUser
}
