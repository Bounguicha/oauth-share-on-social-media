const logger           	= require('../middleware/app-logger');
const service 		   	= require('../services/shareOnSocialNetworkService');

module.exports.getShareOnSocialNetwork = async (req, res) =>  {

    logger.info('[getShareOnSocialNetworkHandler] getShareOnSocialNetwork called ....');

    const result = await service.findByFields(req.query);

    if (result.ShareOnSocialNetwork && result.ShareOnSocialNetwork.length > 0) {

        logger.info('[getShareOnSocialNetworkHandler] Found objects : ' + JSON.stringify(result.ShareOnSocialNetwork));

        res.status(200).send(result.ShareOnSocialNetwork); // return array of abjects
    }
    else if (result.error) {

        logger.error('[getShareOnSocialNetworkHandler] Error when trying to get objects : ' + JSON.stringify(result.error));

        res.status(400).send(result.error); // error
    }
    else {
        res.status(200).send({ msg_code: '0004' }); // No data found
    }
}
