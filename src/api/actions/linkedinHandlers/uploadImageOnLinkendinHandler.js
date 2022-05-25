const validator = require('validator');
const service = require('../../services/shareOnSocialNetworkService');
const fs = require('fs');
module.exports.uploadImageOnLinkedin = async (req,res) =>  {
  const errors = [];
  const base64data = req.body.file.file.replace(/^data:.*,/, '');
  if (errors.length > 0) {
    res.json({errors});
  } else {
    const content = {
      fileName: req.body.file.fileName,
    };
    if (req.body.file.file === '') {
      try {
        const response = await service.uploadImageOnLinkedin(req.body.access_token, req.body.id, content);
        res.json({success: 'Post published successfully.', status: 200});
      } catch (err) {
        res.json({error: 'Unable to publish your post.', status: err.status});
      }
    } else {
      fs.writeFile(req.body.file.fileName, base64data, 'base64', async (err) => {
        if (err) {
          console.log(err);
        } else {
          try {
            const response = await service.uploadImageOnLinkedin(req.body.access_token, req.body.id, content);
            res.json({success: 'Post published successfully.', status: 200});
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
