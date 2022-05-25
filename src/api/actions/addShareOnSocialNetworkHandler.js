const logger           	= require('../middleware/app-logger');
const validation       	= require('node-input-validator');
const service 		   	= require('../services/shareOnSocialNetworkService');

module.exports.addShareOnSocialNetwork = async (req, res) =>  {

    logger.info('[addShareOnSocialNetworkHandler] addShareOnSocialNetwork calling ....');

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
    };

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

    /* execute the validator to check if filds are empty */
    inputValidator.check().then(async (matched) => {

        if (matched) {

            /* check if this ref_data exist or not to add it */
            logger.info('[addShareOnSocialNetworkHandler] addShareOnSocialNetwork service.createShareOnSocialNetwork ....');

            const result = await service.findByKey(req.body);
          console.log('req .boddy ', req.body);
            if (result.ShareOnSocialNetwork && result.ShareOnSocialNetwork.length > 0) {

                logger.info('[addShareOnSocialNetworkHandler] Found object : ' + JSON.stringify(result.ShareOnSocialNetwork));

                res.status(400).send({ msg_code: '0001' }); // modelName already exists

            } else if (result.error) {

                logger.info('[addShareOnSocialNetworkHandler] Found object error : ' + JSON.stringify(result.error));

                res.status(400).send({ msg_code: '0008' }); // find object return error

            }
            else {

                /* Call add function */
                const addResult = await service.createShareOnSocialNetwork(req.body);

                if (addResult.error) {

                    logger.error('[addShareOnSocialNetworkHandler] Error when trying to create object : ' + JSON.stringify(addResult.error));
                    res.status(400).send(addResult.error);

                } else if (addResult.ShareOnSocialNetwork) {

                    logger.info('[addShareOnSocialNetworkHandler] Object created : ' + JSON.stringify(addResult.ShareOnSocialNetwork));

                    res.status(200).send({ShareOnSocialNetwork: addResult.ShareOnSocialNetwork, msg_code: '0007'});
                }
            }
        }
        else {
            res.status(400).send({ msg_code: '0002' }) // Missing required Fields
        }
    });
}
