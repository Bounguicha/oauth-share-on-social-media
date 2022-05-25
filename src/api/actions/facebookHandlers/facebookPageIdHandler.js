const service = require('../../services/shareOnSocialNetworkService');

module.exports.getFacebookPageIdHandler = async (req,res) =>  {
  try {
    const pageData = await service.getFacebookPageId(req.query.access_token, req.query.id);
    res.send({
      pageAccessToken: pageData[0].access_token,
      pageId: pageData[0].id,
      userId: req.query.id,
      userAccessToken: req.query.access_token,
    })
  } catch(err) {
    res.send(`error=${err}`);
  }
}
