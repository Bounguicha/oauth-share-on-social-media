const logger = require('../../middleware/app-logger');
const service = require('../../services/shareOnSocialNetworkService');
require('dotenv').config();
module.exports.getFacebookAuthorizationUrl = async (req, res) =>  {
  const  result = await service.getFacebookAuthLink();
  logger.info('[getLinkedinAuthHandler] Found objects : ' + JSON.stringify(result));
  res.status(200).send( { url: result}); // return array of abjects
}
