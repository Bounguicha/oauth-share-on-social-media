process.env.NODE_ENV = 'test';

const request        = require('supertest');
const { expect }     = require('chai');
const app            = require('../../server');
const db             = require('../middleware/db-connect');

describe('Test the root path', () => {

    /* Test the put Crud without error */
    /*it('should update a shareonsocialnetwork without error ', async () => {

        const response = await request(app).put('/shareonsocialnetwork').send({
            "application_id" : "application_id-testval",
            "company_email" : "company_email-testval",
            "linkedin_email" : "linkedin_email-testval",
    		"title" : "title-updateval",
    		"text" : "text-updateval",
    		"image" : "image-updateval",
    		"date" : "date-updateval"
        });

        expect(response.status).to.equal(200);

    })*/

    /* Test the put Crud with no data found error */
    /*it('should update a shareonsocialnetwork with error shareonsocialnetwork not found  ', async () => {

        const response = await request(app).put('/shareonsocialnetwork').send({
            "application_id" : "application_id-1234567",
            "company_email" : "company_email-1234567",
            "linkedin_email" : "linkedin_email-1234567",
    		"title" : "title-updateval",
    		"text" : "text-updateval",
    		"image" : "image-updateval",
    		"date" : "date-updateval"
        });

        expect(response.status).to.equal(400);
        expect(response.body.msg_code).to.equal('0006');

    })*/

    /* Test the put Crud with mandatory field error (application_id) */
    it('should update a shareonsocialnetwork with error required field application_id', async () => {

        const response = await request(app).put('/shareonsocialnetwork').send({
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

    /* Test the put Crud with mandatory field error (company_email) */
    it('should update a shareonsocialnetwork with error required field company_email', async () => {

        const response = await request(app).put('/shareonsocialnetwork').send({
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

    /* Test the put Crud with mandatory field error (linkedin_email) */
    it('should update a shareonsocialnetwork with error required field linkedin_email', async () => {

        const response = await request(app).put('/shareonsocialnetwork').send({
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

    /* Test the put Crud with mandatory field error (title) */
    it('should update a shareonsocialnetwork with error required field title', async () => {

        const response = await request(app).put('/shareonsocialnetwork').send({
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

    /* Test the put Crud with mandatory field error (text) */
    it('should update a shareonsocialnetwork with error required field text', async () => {

        const response = await request(app).put('/shareonsocialnetwork').send({
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

    /* Test the put Crud with mandatory field error (date) */
    it('should update a shareonsocialnetwork with error required field date', async () => {

        const response = await request(app).put('/shareonsocialnetwork').send({
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

    db.clearDB();

});
