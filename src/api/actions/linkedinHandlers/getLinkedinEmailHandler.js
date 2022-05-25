const service = require('../../services/shareOnSocialNetworkService');

module.exports.getLinkedinEmailHandler = async (req,res) =>  {
  try {
    const email = await service.getLinkedinEmail(req.query.access_token);
    res.send({
      data: email
    })
  } catch(err) {
    res.send(`error=${err}`);
  }
}
