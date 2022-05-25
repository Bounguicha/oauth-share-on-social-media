require('dotenv').config();
const service = require('../../services/shareOnSocialNetworkService');

module.exports.getFacebookAccessTokenHandler = async (req,res) =>  {
  if(!req.query.code) {
    res.redirect('/servicima/shareonsocialnetwork/v1/facebookId');
    return;
  }
  try {
    const data = await service.getFacebookAccessToken(req.query.code);
    res.redirect(`/servicima/shareonsocialnetwork/v1/facebookId?access_token=${data}`);
  } catch(err) {
    res.json(err);
  }
}
