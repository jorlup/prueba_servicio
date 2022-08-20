const { celebrate, Joi } = require('celebrate');
const usersService = require('../../services/users');

const getUsers = async ({ params }, res) => {
	const users = await usersService.getUsers();
	res.status(200).send(users);
};

const getSingleUser = async ({ body, params: { userId } }, res) => {
	const user = await usersService.getUserById(userId);
	res.status(200).send(user);
};

const getProfile = async ({ auth }, res) => {
	console.log(auth);

	if(!auth?.user_id) {
		res.status(401).end();
		return;
	}

	const user = await usersService.getUserById(auth.user_id);
	res.status(200).send(user);
};

const getSingleUserValidation = celebrate({
	params: {
		userId: Joi.number().required(),
	},
});

const addUser = async ({ body }, res) => {
	try {
		const user = await usersService.addUser(body);
		res.status(200).send(user);
	} catch (err) {
		res.status(404).send(err);
	}
};

const addUserValidation = celebrate({
	body: {
		nombre: Joi.string().required(),
		apellido: Joi.string().required(),
		edad: Joi.number().required(),
		sexo: Joi.string().valid('masculino', 'femenino').required(),
		embarazo_lactancia: Joi.boolean().when('sexo', {
			is: 'femenino',
			then: Joi.boolean().valid(true, false),
			otherwise: Joi.boolean().valid(false),
		}),
		fecha_nacimiento: Joi.date().required(),
		teléfono: Joi.string().required(),
	},
});

const deleteUser = async ({ body, params: { userId } }, res) => {
	const success = await usersService.deleteUser(userId);
	res.status(success ? 200 : 400).end();
};

module.exports = {
	getUsers,
	getSingleUser,
	getProfile,
	getSingleUserValidation,
	addUser,
	addUserValidation,
	deleteUser,
};
