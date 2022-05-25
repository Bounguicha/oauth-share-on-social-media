const validator = require('validator');
const service = require('../../services/shareOnSocialNetworkService');
const fs = require('fs');
const errors = [];
const facebookUrl = 'https://www.facebook.com/';
module.exports.postOnFacebookPageHandler = async (req,res) => {
  const {title, text} = req.body.post;
  if (validator.isEmpty(title)) {
    errors.push({ param: 'title', msg: 'Invalid value.' });
  }
  if (validator.isEmpty(text)) {
    errors.push({ param: 'text', msg: 'Invalid value.' });
  }
  if (errors.length > 0) {
    res.json({ errors });
  } else {
    const content = {
      title: title,
      text: text,
      fileName: req.body.file.fileName
    };
    if (req.body.file['file']  !== '') {
        const base64data = req.body.file.file.replace(/^data:.*,/, '');
        fs.writeFile(req.body.file.fileName, base64data, 'base64', async (err) => {
          const response = await service.uploadFacebookImage(req.body.accessToken, req.body.id, content);
          res.json({ success: 'Post published successfully.', url: facebookUrl + response.id, status: 200, body: response });
        });
      } else {
        try {
        const response = await service.postOnFacebookPage(req.body.accessToken, req.body.id, text);
        res.json({ success: 'Post published successfully.', url: facebookUrl + response.id, status: 200, body: response });
      } catch (err) {
        res.json({ error: 'Unable to publish your post.', status: err.status });
      }
      }

  }
}
