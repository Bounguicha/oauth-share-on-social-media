const express       = require('express');
const conf          = require('dotenv');

const appRoutes     = require('./api/routes/appRoutes');

const logger        = require('./api/middleware/app-logger');
const checkAuth     = require('./api/middleware/check-auth');
const corspolicy    = require('./api/middleware/cors-policy');
const dbconnect     = require('./api/middleware/db-connect');
const badReqHandler = require('./api/middleware/bad-req-handler');
const exceptHandler = require('./api/middleware/exceptions-handler');
/* Get Server port from env file */
conf.config({path: `${process.cwd()}/.env`});
const port = process.env.PORT;
const portTest = process.env.PORT_TEST ? process.env.PORT_TEST : 8081;

/* App creation */
const app = express();
app.use(express.json({limit: '50mb'}));

/* Define CORS policy */
app.use(corspolicy);

/* Check if the API Caller if is already logged On using Token */
app.use(checkAuth);
/* Define roots */
appRoutes(app);

/* Handler for 404 */
app.use(badReqHandler);

/* Manage Uncaughted Exception */
app.use(exceptHandler);

/* Database connection to MongoDB */

dbconnect.initDB();

/* Server running */
if (process.env.NODE_ENV === 'test') {
	app.listen(portTest, () => {
		logger.info(`ShareOnSocialNetwork Rest API test listening on port ${portTest}`);
	});
} else {
	app.listen(port, () => {
		logger.info(`ShareOnSocialNetwork Rest API Service listening on port ${port}`);
	});
}
module.exports = app;
