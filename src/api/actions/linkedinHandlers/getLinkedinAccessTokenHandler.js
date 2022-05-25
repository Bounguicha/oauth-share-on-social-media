require('dotenv').config();
const service = require('../../services/shareOnSocialNetworkService');

module.exports.getLinkedinAccessTokenHandler = async (req,res) =>  {
  if(!req.query.code) {
    res.redirect('/servicima/shareonsocialnetwork/v1/linkedinId');
    return;
  }
  try {
    const data = await service.getAccessToken(req.query.code);
    res.redirect(`/servicima/shareonsocialnetwork/v1/linkedinId?access_token=${data.access_token}`);
  } catch(err) {
    res.json(err);
  }
}
