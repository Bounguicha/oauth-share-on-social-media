const service = require('../../services/shareOnSocialNetworkService');

module.exports.getFacebookEmail = async (req,res) =>  {
  try {
    const email = await service.getFacebookUserEmail(req.query.access_token, req.query.id);
    res.send({email})
  } catch(err) {
    res.send(`error=${err}`);
  }
}
