const mongoose      = require('mongoose');
const logger        = require('../middleware/app-logger');
const axios         = require('axios');
require('dotenv').config()
const { readFileSync } = require('fs');
const fs = require('fs');
const json = require('json')
const shareonsocialnetworkSchema = require('../models/shareonsocialnetwork');
const shareonsocialnetwork       = mongoose.model('shareonsocialnetworkSchema', shareonsocialnetworkSchema);
const FormData = require('form-data');
const { log } = require('winston');
const request = require('request');


/* findByKey : Find if the object exists in database */
/********************************************************/
module.exports.findByKey = async object => {

    /*Create the search key for shareonsocialnetworkSchema */
    const filter = {
                'ShareOnSocialNetworkKey.application_id'                : object.application_id,
                'ShareOnSocialNetworkKey.company_email'                 : object.company_email,
                'ShareOnSocialNetworkKey.date'                          : object.date,
                'ShareOnSocialNetworkKey.social_network_name'           : object.social_network_name,

    };

    logger.info('[findByKey] Search criteria : ' + JSON.stringify(filter));

    try {

        const ShareOnSocialNetwork = await shareonsocialnetwork.find(filter);

        return { ShareOnSocialNetwork};

    } catch (error) {
        return { error };
    }
};

/********************************************************/
/* findByFields : Find if the object exists in database */
/********************************************************/
module.exports.findByFields = async object => {

    sort = {};

    if (object.sortfield == 'application_id'  || 
	    object.sortfield == 'company_email'   ||
      object.sortfield == 'date'   ||
      object.sortfield == 'social_network_name'   ||
      object.sortfield == 'social_network_email' ) {

        sort[String('ShareOnSocialNetworkKey.' + object.sortfield)] = object.sort;
    }
    else {
        sort[String(object.sortfield)] = object.sort;
    }

    const filter = {};

    const keys = Object.keys(object);

    keys.forEach(key => {

    	if ((key === 'application_id'  && object.application_id !== '')  ||
      		(key === 'company_email'   && object.company_email !== '') ||
          (key === 'date'            && object.date !== '') ||
        (key === 'social_network_name'            && object.social_network_name !== '') ||
        (key === 'social_network_email'  && object.social_network_email !== '')) {
      		// eslint-disable-next-line security/detect-object-injection
      		filter[String(`ShareOnSocialNetworkKey.${key}`)] = object[key];
    	} else {
        if ((key === 'published' && object.published !== '')) {
          filter[String(`${key}`)] = object[key];
        }
      }
    });

    logger.info('[findByFields] Search criteria : ' + JSON.stringify(filter));

    try {

    	if ((!object.beginning || !object.number) && (!object.sortfield || !object.sort)) {
        	const ShareOnSocialNetwork = await shareonsocialnetwork.find(filter);

        	return { ShareOnSocialNetwork };
        }

    	if (!object.sortfield || !object.sort) {
        	const ShareOnSocialNetwork = await shareonsocialnetwork.find(filter)
        	        				.skip(parseInt(object.beginning, 10))
        	        				.limit(parseInt(object.number, 10));

        	return { ShareOnSocialNetwork };
        }

    	if (!object.beginning || !object.number) {
        	const ShareOnSocialNetwork = await shareonsocialnetwork.find(filter).sort(sort);

        	return { ShareOnSocialNetwork };
        }

        const ShareOnSocialNetwork = await shareonsocialnetwork.find(filter)
        	        			.sort(sort)
        	        			.skip(parseInt(object.beginning, 10))
        	        			.limit(parseInt(object.number, 10));

        return { ShareOnSocialNetwork };
    } catch (error) {
    	return { error };
    }
};

/**************************************************************/
/* findById : Find if the object exists in database using id  */
/**************************************************************/
module.exports.findShareOnSocialNetworkById = async id => {

    logger.info('[findShareOnSocialNetworkById] Find by Id : ' + JSON.stringify(id));

    try {

        const ShareOnSocialNetwork = await shareonsocialnetwork.findById(id);

        logger.info('[findShareOnSocialNetworkById] Found object : ' + JSON.stringify(ShareOnSocialNetwork));

        return { ShareOnSocialNetwork };

    } catch (error) {
        return { error };
    }
};

/********************************************************/
/*    createShareOnSocialNetwork : Insert a new row in database */
/********************************************************/
module.exports.createShareOnSocialNetwork = async body => {

    try {

        const newShareOnSocialNetwork = new shareonsocialnetwork({
            ShareOnSocialNetworkKey: {
                application_id      : body.application_id, 
                company_email       : body.company_email,
              social_network_email      : body.social_network_email,
                date                : body.date,
              social_network_name   : body.social_network_name,
            },
            title               : body.title, 
            text                : body.text, 
            image               : body.image, 
            published           : body.published
        });

        /* Create a new row */
        const ShareOnSocialNetwork = await newShareOnSocialNetwork.save();

        logger.info('[createShareOnSocialNetwork] ShareOnSocialNetwork inserted : ' + JSON.stringify(ShareOnSocialNetwork));

        return { ShareOnSocialNetwork };

    } catch (error) {
        return { error };
    }
};

/********************************************************/
/*    updateShareOnSocialNetwork : Update an object in database */
/********************************************************/
module.exports.updateShareOnSocialNetwork = async body => {

    try {

    	const filter = {
                'ShareOnSocialNetworkKey.application_id'      : body.application_id,
                'ShareOnSocialNetworkKey.company_email'       : body.company_email,
                'ShareOnSocialNetworkKey.social_network_email'      : body.social_network_email,
                'ShareOnSocialNetworkKey.date'                : body.date,
                'ShareOnSocialNetworkKey.social_network_name'                : body.social_network_name,


      }

    	const fieldsToUpdate = {
                'ShareOnSocialNetworkKey.social_network_email'      : body.social_network_email,
                'title'               : body.title,
                'text'                : body.text,
                'image'               : body.image,
                'published'           : body.published
		};

        /* Find and update the record  */
      	const ShareOnSocialNetwork = await shareonsocialnetwork.findOneAndUpdate(filter,
                                                       	fieldsToUpdate,
                                                       	{ new: true, upsert: true, useFindAndModify: false });

        return { ShareOnSocialNetwork };

    } catch (error) {
        return { error };
    }
};
/**************************************************************/
/*    deleteShareOnSocialNetwork : delete object from database     */
/**************************************************************/
module.exports.deleteShareOnSocialNetwork = async id => {

    try {
        const filter = { '_id': id };

        /* Create a new row */
        const ShareOnSocialNetwork = await shareonsocialnetwork.findOneAndDelete(filter);

        return { ShareOnSocialNetwork };

    } catch (error) {
        return { error };
    }
};
/**************************************************************
 @description get Linkedin Authentication url link
**************************************************************/
module.exports.getAuthUrl = ()  => {

  try {
    const state ='LINKEDIN';
    const scope = 'r_liteprofile r_emailaddress w_member_social';
        return `${process.env.LINKEDIN_AUTH_URL}?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URL)}&state=${state}&scope=${encodeURIComponent(scope)}`
  } catch (error) {
    return { error };
  }
};
/**************************************************************
 @description get Linkedin Access Token
 **************************************************************/
module.exports.getAccessToken = async code  => {
  const body = {
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.REDIRECT_URL,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
  };
  return new Promise((resolve, reject) => {
    request.post({url: process.env.ACCESS_TOKEN_URL, form: body }, (err, response, body) =>
      {
        if(err) {
          reject(err);
        }
        resolve(JSON.parse(body));
      }
    );
  });
};
/**************************************************************
 @description get Linkedin Id
 **************************************************************/
module.exports.getLinkedinId = async token  => {
  return new Promise((resolve, reject) => {
    const url = 'https://api.linkedin.com/v2/me';
    const headers = {
      'Authorization': 'Bearer ' + token,
      'cache-control': 'no-cache',
      'X-Restli-Protocol-Version': '2.0.0'
    };

    request.get({ url: url, headers: headers }, (err, response, body) => {
      if(err) {
        reject(err);
      }
      resolve(JSON.parse(body).id);
    });
  });
};
/**************************************************************
 @description Share posts on linkedin
 **************************************************************/
module.exports.publishOnLinkedin = (access_token, linkedinId, content ) => {
  const registerUpload = {
    registerUploadRequest:{
      owner:"urn:li:person:" + linkedinId,
      recipes:[
        "urn:li:digitalmediaRecipe:feedshare-image"
      ],
      serviceRelationships:[
        {
          identifier:"urn:li:userGeneratedContent",
          relationshipType:"OWNER"
        }
      ],
      supportedUploadMechanism:[
        "SYNCHRONOUS_UPLOAD"
      ]
    },
  }
  const url = 'https://api.linkedin.com/v2/shares';
  const { title, text , fileName, fileType, fileUrl} = content;
  const headers = {
    'Authorization': 'Bearer ' + access_token,
    'cache-control': 'no-cache',
    'X-Restli-Protocol-Version': '2.0.0',
    'x-li-format': 'json'
  };
  if (!fileName) {
    const body = {
      owner: 'urn:li:person:' + linkedinId,
      subject: title,
      distribution: {
        linkedInDistributionTarget: {}
      },
      text: {
        text: text
      },
    }
    return new Promise((resolve, reject) => {
      request.post({ url: url, json: body, headers: headers}, (err, response, body) => {
        if(err) {
          console.log(err)
          reject(err);
        }
        resolve(body);
      });
    });
  } else if (fileType === 'pdf') {
    const imageUrl = 'https://au.hudson.com/wp-content/cache/bb-plugin/cache/resume-examples-1024x731-landscape.png'
    const body = {
      owner: 'urn:li:person:' + linkedinId,
      subject: title,
      distribution: {
        linkedInDistributionTarget: {}
      },
      content: {
        contentEntities: [
          {
            entityLocation: fileUrl,
            thumbnails: [
              {
                authors: [],
                imageSpecificContent: {},
                publishers: [],
                resolvedUrl: imageUrl
              }
            ],
            title: title
          }
        ],
        shareMediaCategory: 'ARTICLE',
        title: title
      },
      text: {
        text: text
      },
    }
    return new Promise((resolve, reject) => {
      request.post({ url: url, json: body, headers: headers}, (err, response, body) => {
        if(err) {
          console.log(err)
          reject(err);
        }
        resolve(body);
      });
    });
  } else {
    return axios({
        method: "post",
        url: `https://api.linkedin.com/v2/assets?action=registerUpload`,
        headers: {
          'Content-Type': `application/json`,
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + access_token
        },
        data: registerUpload
      }
    ).then( (res) => {
      return axios({
        method: "put",
        headers: {
          'Authorization': 'Bearer ' + access_token,
          "x-amz-server-side-encryption-aws-kms-key-id": linkedinId,
          "x-amz-server-side-encryption": "aws:kms",
          "Content-Type": "application/octet-stream"
        },
        url: `${res.data.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl}`,
        data: readFileSync(fileName),
      }).then( (resUploadedImage) => {
        const body = {
          owner: `urn:li:person:${linkedinId}`,
          text: {
            text: text
          },
          subject: title,
          distribution: {
            linkedInDistributionTarget: {}
          },
          content: {
            contentEntities: [
              {
                entity: res.data.value.asset
              }
            ],
            title: title,
            shareMediaCategory: 'IMAGE'
          }
        };
        return new Promise((resolve, reject) => {
          request.post({ url: url, json: body, headers: headers}, (err, response, body) => {
            if(err) {
              console.log(err)
              reject(err);
            }
            resolve(body);
            fs.unlink(fileName, (err) => {
              if (err) {
                console.log('error in deleting local file ')
              } else {
                console.log('local file deleted successfully');
              }

            })
          });
        });
      });
    });
  }

}
/**************************************************************
 @description Upload image into linkedin Api
 **************************************************************/
module.exports.uploadImageOnLinkedin = (access_token, linkedinId, content) => {
  const registerUpload = {
    registerUploadRequest:{
      owner:"urn:li:person:" + linkedinId,
      recipes:[
        "urn:li:digitalmediaRecipe:feedshare-image"
      ],
      serviceRelationships:[
        {
          identifier:"urn:li:userGeneratedContent",
          relationshipType:"OWNER"
        }
      ],
      supportedUploadMechanism:[
        "SYNCHRONOUS_UPLOAD"
      ]
    },
  };
  const { fileName } = content;

  return new Promise((resolve, reject) => {
    return axios({
        method: "post",
        url: `https://api.linkedin.com/v2/assets?action=registerUpload`,
        headers: {
          'Content-Type': `application/json`,
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + access_token
        },
        data: registerUpload
      }
    ).then((res) => {
      return axios({
        method: "put",
        headers: {
          'Authorization': 'Bearer ' + access_token,
          "x-amz-server-side-encryption-aws-kms-key-id": linkedinId,
          "x-amz-server-side-encryption": "aws:kms",
          "Content-Type": "application/octet-stream"
        },
        url: `${res.data.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl}`,
        data: readFileSync(fileName),
      }).then((resUploadedImage) => {
          resolve(res.data.value.asset)
        })
    });
  });
}
/**************************************************************
 @description Get linkedin Profile email
 **************************************************************/
module.exports.getLinkedinEmail = (access_token) => {
  return new Promise((resolve, reject) => {
    request.get({
      url: "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
      headers: { "Authorization": "Bearer " + access_token }
    }, function(err, res, responseBody) {
      if (err) {
        console.log(err);
        resolve(err);
      } else {
        resolve(JSON.parse(responseBody))
      }
    });
  });
}
/**************************************************************
 @description get Facebook Authentication url link
 **************************************************************/
module.exports.getFacebookAuthLink= () => {
  try {
    const state = 'FACEBOOK'
    const scope = 'pages_read_engagement, pages_manage_posts, user_photos, email, pages_show_list';
    return `${process.env.FACEBOOK_AUTH_URL}?response_type=code&display=popup&client_id=${process.env.FACEBOOK_CLIENT_ID_TEST}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URL)}&scope=${encodeURIComponent((scope))}&state=${state}`
  } catch (error) {
    return { error };
  }
}
/**************************************************************
 @description get Facebook Access token
 **************************************************************/
module.exports.getFacebookAccessToken = async code  => {
  return new Promise((resolve, reject) => {
    request(
      `${process.env.FACEBOOK_ACCESS_TOKEN_URL}?redirect_uri=${encodeURIComponent(process.env.REDIRECT_URL)}&client_id=${process.env.FACEBOOK_CLIENT_ID_TEST}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET_TEST}&code=${code}`,  (error, response, body) => {
      console.error('error:', error); // Print the error if one occurred
        resolve(JSON.parse(response.body).access_token)
    });
  });
};
/**************************************************************
 @description get Facebook Id
 **************************************************************/
module.exports.getFacebookId = async token  => {
  return new Promise((resolve, reject) => {
    const url = `https://graph.facebook.com/v12.0/me`;
    const headers = {
      'accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    };

    request.get({ url: url, headers: headers }, (err, response, body) => {
      if(err) {
        reject(err);
      }
      resolve(JSON.parse(body)['id']);
    });
  });
};
/**************************************************************
 @description get Facebook Page Id
 **************************************************************/
module.exports.getFacebookPageId = async (token, id)  => {
  return new Promise((resolve, reject) => {
    const url = `https://graph.facebook.com/${id}/accounts`;
    request(
      `${url}?access_token=${token}`,  (error, response, body) => {
        console.error('error:', error); // Print the error if one occurred
        resolve(JSON.parse(response.body).data)
      });
  });
};
/**************************************************************
 @description Share posts on facebook page
 **************************************************************/
module.exports.postOnFacebookPage = (token,id, message) => {
  return new Promise((resolve, reject) => {
    const url = `https://graph.facebook.com/${id}/feed`;
    request.post(
      `${url}?message=${message}&access_token=${token}`,  (error, response, body) => {
        console.error('error:', error); // Print the error if one occurred
        resolve(JSON.parse(body));
      });
  });
}
/**************************************************************
 @description Share facebook profile email
 **************************************************************/
module.exports.getFacebookUserEmail = (token, id) => {
  return new Promise((resolve, reject) => {
    const url = `https://graph.facebook.com/${id}?fields=email&access_token=${token}&id=${id}`;
    request(
      `${url}`,  (error, response, body) => {
        console.error('error:', error); // Print the error if one occurred
        resolve(JSON.parse(response.body).email)
      });
  });
}
/**************************************************************
 @description Share facebook posts attached by image
 **************************************************************/
module.exports.uploadFacebookImage = (token, pageId, content) => {
  const { title, text , fileName} = content;
  return new Promise((resolve, reject) => {
    const url = `https://graph.facebook.com/v12.0/${pageId}/photos?access_token=${token}`;
    let req = request.post(url, (err, res, body) => {
      if (err)
        return console.error('Upload failed:', err);
      console.log('Upload successful! Server responded with:', body);
      resolve(JSON.parse(body))
      fs.unlink(fileName, (err) => {
        if (err) {
          console.log('error in deleting local file ')
        } else {
          console.log('local file deleted successfully');
        }
  })
    });
    const form = req.form()
    form.append('title', title);
    form.append('message', text);
    form.append('source', fs.createReadStream(fileName));
      });
}
