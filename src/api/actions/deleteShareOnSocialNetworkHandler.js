const logger           = require('../middleware/app-logger');
const service 		   = require('../services/shareOnSocialNetworkService');

module.exports.deleteShareOnSocialNetwork = async (req, res) =>  {

    logger.info('[deleteShareOnSocialNetworkHandler] deleteShareOnSocialNetworkHandler called ....');

    const result = await service.findShareOnSocialNetworkById(req.query._id);

    // Check if only one object has been returned
    if (result.ShareOnSocialNetwork) {

        logger.info('[deleteShareOnSocialNetworkHandler] Found object : ' + JSON.stringify(result.ShareOnSocialNetwork));

        /* Call update function */
        const deleteResult = await service.deleteShareOnSocialNetwork(req.query._id);

        if (deleteResult.error) {

            logger.error('[deleteShareOnSocialNetworkHandler] Error when trying to update object : ' + JSON.stringify(deleteResult.error));
            res.status(400).send(deleteResult.error);

        } else if (deleteResult.ShareOnSocialNetwork) {

           	logger.info('[deleteShareOnSocialNetworkHandler] Disabled object : ' + JSON.stringify(deleteResult.ShareOnSocialNetwork));

           	res.status(200).send(deleteResult.ShareOnSocialNetwork);
        }
    }
    else {
        // Object not found
        logger.info('[deleteShareOnSocialNetworkHandler] Object not found ');

        res.status(400).send({ msg_code: '0006' }); // ShareOnSocialNetwork not found
    }
}
