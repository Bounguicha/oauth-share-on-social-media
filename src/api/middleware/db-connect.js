const conf    = require('dotenv');
const logger  = require('./app-logger');

var mongoose  = require('mongoose');
var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);

/* Get database env variable from .env */
conf.config({ path: `${process.cwd()}/.env` });

const dbusername = process.env.DB_USER_NAME ? process.env.DB_USER_NAME : 'mongo';
const password = process.env.DB_PWD ? process.env.DB_PWD : 'mongo';
const protocol = process.env.PROTOCOL ? process.env.PROTOCOL : 'mongodb';
const dbhost = process.env.DB_HOST ? process.env.DB_HOST : 'mongo';
const dbname = process.env.DB_NAME ? process.env.DB_NAME : 'admin';

module.exports.initDB = () => {

  /* Connect to WDGTL-Cluster */
  if (process.env.NODE_ENV === 'test') {

    const dbport = process.env.DB_PORT ? process.env.DB_PORT : '27017';

    mockgoose.prepareStorage().then(() => {

      mongoose.connect(
        `${protocol}://${dbusername}:${password}@${dbhost}:${dbport}/${dbname}?retryWrites=true&w=majority`,
        { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
        err => {
          if (err) logger.error(`[db-connect] Database connection failure, error ${err}`);
        },
      );

      mongoose.connection.on('open', () => {
        logger.info(`[db-connect] Connected to mock`);
      });

    });

  } else {

    const dbport = process.env.DB_PORT;
    let url = '';

    if (dbport) {
      url = `${protocol}://${dbusername}:${password}@${dbhost}:${dbport}/${dbname}?retryWrites=true&w=majority`;
    } else {
      url = `${protocol}://${dbusername}:${password}@${dbhost}/${dbname}?retryWrites=true&w=majority`;
    }

    logger.info(`[db-connect] Connection attemp to ${dbname} database`);

    /* Log all db evenements */
    mongoose.connection
      .on('error', error => {
        logger.error('[db-connect] Database connection error', error);
      })
      .on('close', () => {
        logger.info('[db-connect] Database closed');
      })
      .once('open', async () => {
        logger.info(`[db-connect] Connected to ${dbname} database`);
      });

    mongoose.connect(
      url,
      { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
      err => {
        if (err) logger.error(`[db-connect] Database connection failure, error ${err}`);
      },
    );
  }
};

module.exports.clearDB = () => {
  mockgoose.helper.reset().then(() => {});
};

module.exports.clearDB = () => {

  mockgoose.prepareStorage().then(() => {

    mongoose.connect(
      `${protocol}://${dbusername}:${password}@${dbhost}:${dbport}/${dbname}?retryWrites=true&w=majority`,
      { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
    );

    /* Drop the DB */
    mongoose.connection.dropDatabase();
  });
};
