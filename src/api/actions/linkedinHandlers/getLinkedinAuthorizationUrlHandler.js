const logger = require('../../middleware/app-logger');
const service = require('../../services/shareOnSocialNetworkService');
require('dotenv').config();
module.exports.getLinkedinAuthorizationUrl = async (req, res) =>  {
  const  result = await service.getAuthUrl();
  logger.info('[getLinkedinAuthHandler] Found objects : ' + JSON.stringify(result));
  res.status(200).send( { url: result}); // return array of abjects
}
