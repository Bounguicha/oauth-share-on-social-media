const jwt 		= require('jsonwebtoken');
const logger 	= require('./app-logger');

module.exports = (req, res, next) => {

	if (process.env.NODE_ENV === 'test') {
		/* User autorized, call the next step */
		next();
	}
	else {

		try {

			/* Get the token from the header */
			if (req.headers.authorization) {

				const token = req.headers.authorization.split(" ")[1];

				/* Check if Token is valid */
				var key = '';

				if (req.query.application === 'AUTH-MODULE') 
					key = process.env.ACCOUNT_ACTIVATION_TOKEN;
				else 
					key = process.env.ACCESS_TOKEN_SECRET;

				const decoded = jwt.verify(token, key);
				req.userData = decoded;

				/* User autorized, call the next step */
				next();

			} else {

				/* Token doesn't exists */
				logger.info('[check-auth] Authorization failed........');
				return res.status(401).json({msg_code : '0005'}); // Authorization failed
			}
		}
		catch(error) {

			if (error.name === 'TokenExpiredError') {

				logger.info('[check-auth] Warning - Token expired');
				return res.status(401).json({msg_code : '0005'}); // Authorization failed
			}
			else {
				if (error.name === 'JsonWebTokenError') {

					logger.error('[check-auth] Alter - Invalid token signature');
					return res.status(401).json({msg_code : '0005'}); // Authorization failed
				}
			}

			logger.info('[check-auth] Found error : ' + JSON.stringify(error));
			return res.status(401).json({msg_code : '0005'}); // Authorization failed
		}
	}
};
