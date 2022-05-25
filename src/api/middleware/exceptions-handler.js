const mongoose      = require('mongoose');
const logger        = require('./app-logger');

module.exports = (req, res, next) => {

    process.on('uncaughtException', (err, origin) => {

        logger.info(`[Server] Caught exception: ${err} ` `Exception origin: ${origin}`);

    });

    /* Close connection when proess exit */
    process.on('SIGINT', function() {

        mongoose.connection.close(function() {

            logger.info("[Server] Mongoose default connection is disconnected due to application termination");

            process.exit(0);
        });
    });
};
