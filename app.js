const http = require('http');
const app = require('express')();
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const winston = require('winston');
const { errors } = require('celebrate');

const authorization = require('./routes/middlewares/authorization');
const logger = require('./routes/middlewares/logger');
const routes = require('./routes/routes');

http.globalAgent.keepAlive = true;

const { PORT, NODE_ENV } = process.env;

app.disable('x-powered-by');
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/healthcheck', (req, res) => {
	try {
		res.send({
			uptime: Math.round(process.uptime()),
			message: 'OK',
			timestamp: Date.now(),
		});
	} catch (e) {
		res.status(503).end();
	}
});
app.use('/v1/profile',authorization);
app.use('/v1', routes);
app.use(errors());
app.use(logger);

if (NODE_ENV !== 'test') {
	(async () => {
		app.listen(PORT, () => {
			winston.info(`Server listening on http://localhost:${PORT}`);
		});
	})();
}

module.exports = app;
