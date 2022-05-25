const logger           = require('../middleware/app-logger');
const validation       = require('node-input-validator');
const service 		   = require('../services/shareOnSocialNetworkService');

module.exports.updateShareOnSocialNetwork = async (req, res) =>  {

    logger.info('[updateShareOnSocialNetworkHandler] updateShareOnSocialNetwork calling ....');
    /* create an object to get all variables sended by the user of the API */
    const body = {
                application_id           : req.body.application_id,
                company_email            : req.body.company_email,
                social_network_email     : req.body.social_network_email,
                title                    : req.body.title,
                text                     : req.body.text,
                image                    : req.body.image,
                date                     : req.body.date,
                published                : req.body.published,
                social_network_name      : req.body.social_network_name

    }

    /* create an object validator to verify the existance of inputs of the API */
    const inputValidator = new validation.Validator(body, { 
                                                            application_id      : 'required', 
                                                            company_email       : 'required',
                                                            social_network_email: 'required',
                                                            title               : 'required',
                                                            text                : 'required',
                                                            date                : 'required',
                                                            social_network_name : 'required'

    });

    /* excuse the validator to check if filds are empty */
    inputValidator.check().then(async (matched) => {
        if (matched) {

            /* check if this ref_data exist or not to update it */
            const result = await service.findByKey(req.body);

            // Check if only one object has been returned
            if (result.ShareOnSocialNetwork && result.ShareOnSocialNetwork.length == 1) {

               logger.info('[updateShareOnSocialNetworkHandler] Found object : ' + JSON.stringify(result.ShareOnSocialNetwork));

               /* Call update function */
               const updateResult = await service.updateShareOnSocialNetwork(req.body);

                if (updateResult.error) {

                    logger.error('[updateShareOnSocialNetworkHandler] Error when trying to update object : ' + JSON.stringify(updateResult.error));
                    res.status(400).send(updateResult.error);

                } else if (updateResult.ShareOnSocialNetwork) {

                    logger.info('[updateShareOnSocialNetworkHandler] Object updated : ' + JSON.stringify(updateResult.ShareOnSocialNetwork));

                    res.status(200).send(updateResult.ShareOnSocialNetwork);

                }
            }
            else {
                if (result.ShareOnSocialNetwork && result.ShareOnSocialNetwork.length > 1) {

                    // Many objects
                    logger.info('[updateShareOnSocialNetworkHandler] Many objects returned');

                    res.status(400).send({ msg_code: '0005' });

                }
                else {
                    // Object not found
                    logger.info('[updateShareOnSocialNetworkHandler] Object not found ');

                    res.status(400).send({ msg_code: '0006' }); // ShareOnSocialNetwork not found
                }
            }
        }
        else {
            res.status(400).send({ msg_code: '0002' }) // Missing required Fields
        }
    });
}
