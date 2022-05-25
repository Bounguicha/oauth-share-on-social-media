const service = require('../../services/shareOnSocialNetworkService');

module.exports.getFacebookIdHandler = async (req,res) =>  {
  try {
    const id = await service.getFacebookId(req.query.access_token);
    res.redirect(`/servicima/shareonsocialnetwork/v1/facebookPageId?access_token=${req.query.access_token}&id=${id}`)
  } catch(err) {
    res.send(`error=${err}`);
  }
}
