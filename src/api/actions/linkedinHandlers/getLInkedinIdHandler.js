const service = require('../../services/shareOnSocialNetworkService');

module.exports.getLinkedinIdHandler = async (req,res) =>  {
  try {
    const id = await service.getLinkedinId(req.query.access_token);
    res.send({
      access_token: req.query.access_token,
      id: id
    })
  } catch(err) {
    res.send(`error=${err}`);
  }
}
