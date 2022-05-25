const bodyParser    = require('body-parser');

const addHandler         = require('../actions/addShareOnSocialNetworkHandler');
const updateHandler      = require('../actions/updateShareOnSocialNetworkHandler');
const deleteHandler      = require('../actions/deleteShareOnSocialNetworkHandler');
const getHandler         = require('../actions/getShareOnSocialNetworkHandler');
const authUrlHandler		 = require('../actions/linkedinHandlers/getLinkedinAuthorizationUrlHandler');
const accessTokenHandler = require('../actions/linkedinHandlers/getLinkedinAccessTokenHandler');
const linkedinIdHandler	 = require('../actions/linkedinHandlers/getLInkedinIdHandler');
const postOnLinkedinHandler = require('../actions/linkedinHandlers/postOnLinkedinHandler');
const linkedinEmail = require('../actions/linkedinHandlers/getLinkedinEmailHandler');
const facebookAuthUrlHandler = require('../actions/facebookHandlers/getFacebookAuthorizationHandler');
const uploadImageOnLinkedinHandler = require('../actions/linkedinHandlers/uploadImageOnLinkendinHandler');
const facebookAccessTokenHandler = require('../actions/facebookHandlers/getFacebookAccessTokenHandler');
const facebookIdHandler	 = require('../actions/facebookHandlers/getFacebookIdHandler');
const facebookPageIdHandler = require('../actions/facebookHandlers/facebookPageIdHandler')
const postOnFacebookPageHandler = require('../actions/facebookHandlers/postOnFacebookPageHandler')
const facebookEmailHandler = require('../actions/facebookHandlers/getFacebookEmailHandler')

module.exports = routes = app =>  {

	/* Body parser to Json*/
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	/* Define the root for the get method */
	app.route('/servicima/shareonsocialnetwork/v1').get(getHandler.getShareOnSocialNetwork);

	/* Define the root for the post method */
	app.route('/servicima/shareonsocialnetwork/v1').post(addHandler.addShareOnSocialNetwork);

	/* Define the root for the put method */
	app.route('/servicima/shareonsocialnetwork/v1').put(updateHandler.updateShareOnSocialNetwork);

	/* Define the root for the delete method */
	app.route('/servicima/shareonsocialnetwork/v1').delete(deleteHandler.deleteShareOnSocialNetwork);

	/* Define the root for the get linkedin Authorization url */
	app.route('/servicima/shareonsocialnetwork/v1/auth').get(authUrlHandler.getLinkedinAuthorizationUrl);

	/* Define the root for the get linkedin Access Token */
	app.route('/servicima/shareonsocialnetwork/v1/AccessToken').get(accessTokenHandler.getLinkedinAccessTokenHandler);

	/* Define the root for the get linkedin Id */
	app.route('/servicima/shareonsocialnetwork/v1/linkedinId').get(linkedinIdHandler.getLinkedinIdHandler);

	/* Define the root for the post on linkedin  */
	app.route('/servicima/shareonsocialnetwork/v1/postOnLinkedin').post(postOnLinkedinHandler.postOnLinkedinHandler);

	/* Define the root for the getting linkedin email  */
	app.route('/servicima/shareonsocialnetwork/v1/linkedinEmail').get(linkedinEmail.getLinkedinEmailHandler);

	/* Define the root for uploading linkedin image  */
	app.route('/servicima/shareonsocialnetwork/v1/uploadImage').post(uploadImageOnLinkedinHandler.uploadImageOnLinkedin);

	/* Define the root for get facebook auth url  */
	app.route('/servicima/shareonsocialnetwork/v1/facebookAuth').get(facebookAuthUrlHandler.getFacebookAuthorizationUrl)

	/* Define the root for get access token handler  */
	app.route('/servicima/shareonsocialnetwork/v1/facebookAccessToken').get(facebookAccessTokenHandler.getFacebookAccessTokenHandler)

	/* Define the root get facebook id handler   */
	app.route('/servicima/shareonsocialnetwork/v1/facebookId').get(facebookIdHandler.getFacebookIdHandler)

	/* Define the root for get facebook page id handler  */
	app.route('/servicima/shareonsocialnetwork/v1/facebookPageId').get(facebookPageIdHandler.getFacebookPageIdHandler)

	/* Define the root for the post on facebook  */
	app.route('/servicima/shareonsocialnetwork/v1/postOnFacebookPage').post(postOnFacebookPageHandler.postOnFacebookPageHandler)

	/* Define the root for get facebook email  */
	app.route('/servicima/shareonsocialnetwork/v1/facebookEmail').get(facebookEmailHandler.getFacebookEmail)


}
