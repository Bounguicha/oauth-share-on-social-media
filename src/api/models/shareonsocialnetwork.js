const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = shareonsocialnetworkSchema = new Schema({

    /* Unique Key */
    ShareOnSocialNetworkKey :
    {   
		application_id :
        {
        	type: String,
            required: true,
        },

		company_email :
        {
        	type: String,
            required: true,
        },
    social_network_name :
        {
          type: String,
          required: true,
        },
		social_network_email :
        {
        	type: String,
            required: true,
        },
      date :
        {
          type: Date,
          required: true,
        },
        type: {},
        required: true,
        unique: true
    },

    /* Other fields */
    title :
    {
        type: String,
        required: true,
    },

    text :
    {
        type: String,
        required: true,
    },

    image :
    {
        type: String,
        required: false,
    },
    published:
      {
          type: Boolean,
          required: false,
      },
});
