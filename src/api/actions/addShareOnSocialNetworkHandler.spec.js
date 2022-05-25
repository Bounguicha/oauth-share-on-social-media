process.env.NODE_ENV = 'test';

const request        = require('supertest');
const { expect }     = require('chai');
const app            = require('../../server');
const db             = require('../middleware/db-connect');

describe('Test the root path', () => {

    /* Test the post Crud */
    /*it('should post a shareonsocialnetwork without errors', async () => {

        const response = await request(app).post('/shareonsocialnetwork').send({
            "application_id" : "application_id-testval",
            "company_email" : "company_email-testval",
            "linkedin_email" : "linkedin_email-testval",
    		"title" : "title-testval",
    		"text" : "text-testval",
    		"image" : "image-testval",
    		"date" : "date-testval"
    	});

    	expect(response.status).to.equal(200);
    	expect(response.body.msg_code).to.equal('0007');
      	shareonsocialnetworktest['id'] = response.body.ShareOnSocialNetwork._id;

    });*/

    /* Test the post Crud with mandatory field error (application_id) */
    it('should post a shareonsocialnetwork with error required field application_id', async () => {

        const response = await request(app).post('/shareonsocialnetwork').send({
            "company_email" : "company_email-testval",
            "linkedin_email" : "linkedin_email-testval",
    		"title" : "title-testval",
    		"text" : "text-testval",
    		"image" : "image-testval",
    		"date" : "date-testval",
        });

        expect(response.status).to.equal(400);
        expect(response.body.msg_code).to.equal('0002');

    });

    /* Test the post Crud with mandatory field error (company_email) */
    it('should post a shareonsocialnetwork with error required field company_email', async () => {

        const response = await request(app).post('/shareonsocialnetwork').send({
            "application_id" : "application_id-testval",
            "linkedin_email" : "linkedin_email-testval",
    		"title" : "title-testval",
    		"text" : "text-testval",
    		"image" : "image-testval",
    		"date" : "date-testval",
        });

        expect(response.status).to.equal(400);
        expect(response.body.msg_code).to.equal('0002');

    });

    /* Test the post Crud with mandatory field error (linkedin_email) */
    it('should post a shareonsocialnetwork with error required field linkedin_email', async () => {

        const response = await request(app).post('/shareonsocialnetwork').send({
            "application_id" : "application_id-testval",
            "company_email" : "company_email-testval",
    		"title" : "title-testval",
    		"text" : "text-testval",
    		"image" : "image-testval",
    		"date" : "date-testval",
        });

        expect(response.status).to.equal(400);
        expect(response.body.msg_code).to.equal('0002');

    });

    /* Test the post Crud with mandatory field error (title) */
    it('should post a shareonsocialnetwork with error required field title', async () => {

        const response = await request(app).post('/shareonsocialnetwork').send({
            "application_id" : "application_id-testval",
            "company_email" : "company_email-testval",
            "linkedin_email" : "linkedin_email-testval",
    		"text" : "text-testval",
    		"image" : "image-testval",
    		"date" : "date-testval",
        });

        expect(response.status).to.equal(400);
        expect(response.body.msg_code).to.equal('0002');

    });

    /* Test the post Crud with mandatory field error (text) */
    it('should post a shareonsocialnetwork with error required field text', async () => {

        const response = await request(app).post('/shareonsocialnetwork').send({
            "application_id" : "application_id-testval",
            "company_email" : "company_email-testval",
            "linkedin_email" : "linkedin_email-testval",
    		"title" : "title-testval",
    		"image" : "image-testval",
    		"date" : "date-testval",
        });

        expect(response.status).to.equal(400);
        expect(response.body.msg_code).to.equal('0002');

    });

    /* Test the post Crud with mandatory field error (date) */
    it('should post a shareonsocialnetwork with error required field date', async () => {

        const response = await request(app).post('/shareonsocialnetwork').send({
            "application_id" : "application_id-testval",
            "company_email" : "company_email-testval",
            "linkedin_email" : "linkedin_email-testval",
    		"title" : "title-testval",
    		"text" : "text-testval",
    		"image" : "image-testval",
        });

        expect(response.status).to.equal(400);
        expect(response.body.msg_code).to.equal('0002');

    });

    /* Test the post Crud with duplicated error */
    /*it('should post a shareonsocialnetwork with error duplicated shareonsocialnetwork', async () => {

        const response = await request(app).post('/shareonsocialnetwork').send({
            "application_id" : "application_id-testval",
            "company_email" : "company_email-testval",
            "linkedin_email" : "linkedin_email-testval",
    		"title" : "title-testval",
    		"text" : "text-testval",
    		"image" : "image-testval",
    		"date" : "date-testval"
        });

        expect(response.status).to.equal(400);
        expect(response.body.msg_code).to.equal('0001');

    });*/

    db.clearDB();
});
