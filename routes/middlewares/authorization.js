const fs = require('fs');
var { expressjwt: jwt } = require("express-jwt");

//const JWT_PUBLIC_KEY = fs.readFileSync('public.key');
const SET_TOKEN_AS_REVOKEN_ON_EXCEPTION = true;
const TOKENS_BLACK_LIST = [];

const getTokensBlacklist = async () => TOKENS_BLACK_LIST;

const checkTokenInBlacklistCallback = async (req, payload, done) => {
	try {
		// jti (JWT ID) need to be included in payload
		const { jti } = payload;
		const blacklist = await getTokensBlacklist();
		const tokenIsRevoked = blacklist.includes(jti);
		return done(null, tokenIsRevoked);
	} catch (e) {
		return done(e, SET_TOKEN_AS_REVOKEN_ON_EXCEPTION);
	}
};

const authorization = jwt({ secret: "shhhhhhared-secret", algorithms: ["HS256"] });

module.exports = authorization;
