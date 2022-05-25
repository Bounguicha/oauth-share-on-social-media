const service = require('../../services/shareOnSocialNetworkService');
const fs = require('fs');
const validator = require("validator");

module.exports.postOnLinkedinHandler = async (req,res) =>  {
  const postUrl = 'https://www.linkedin.com/feed/update/'
  const errors = [];
  const {title, text} = req.body.post;
  if (validator.isEmpty(title)) {
    errors.push({param: 'title', msg: 'Invalid value.'});
  }
  if (validator.isEmpty(text)) {
    errors.push({param: 'text', msg: 'Invalid value.'});
  }
  if (errors.length > 0) {
    res.json({errors});
  } else {
    const content = {
      title: title,
      text: text,
      fileName: req.body.file.fileName,
      fileType: req.body.file.fileType,
      fileUrl: req.body.file.fileUrl ? req.body.file.fileUrl : ''
    };
    if (req.body.file['file']  === '' || req.body.file.fileType === 'pdf') {
      try {
        const response = await service.publishOnLinkedin(req.body.access_token, req.body.id, content);
        res.json({success: 'Post published successfully.', url: postUrl + response.activity, status: 200});
      } catch (err) {
        res.json({error: 'Unable to publish your post.', status: err.status});
      }
    } else {
      const base64data = req.body.file.file.replace(/^data:.*,/, '');
      fs.writeFile(req.body.file.fileName, base64data, 'base64', async (err) => {
        if (err) {
          console.log(err);
        } else {
          try {
            const response = await service.publishOnLinkedin(req.body.access_token, req.body.id, content);
            console.log('response linkedin =', response);
            res.json({success: 'Post published successfully.', url: postUrl + response.activity, status: 200});
          } catch (err) {
            res.json({error: 'Unable to publish your post.', status: err.status});
            fs.unlink(req.body.file.fileName, (err) => {
              if (err) {
                console.log('error in deleting local file ')
              } else {
                console.log('but local file deleted successfully');
              }
            })
          }
        }
      });
    }

    }
}
