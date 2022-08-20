//const fs = require('fs');
const jwt = require('jsonwebtoken');

//const JWT_PRIVATE_KEY = fs.readFileSync('private.key');

const jwtKey = "shhhhhhared-secret"
const jwtExpirySeconds = 30000

const getSignedToken = (payload, jwtOptions) =>
	new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			jwtKey,
			{
				...jwtOptions,
				algorithm: "HS256",
				expiresIn: jwtExpirySeconds,
			},
			(err, token) => (err ? reject(err) : resolve(token))
		);
	});

module.exports = {
	getSignedToken
};
