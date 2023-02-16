const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.use(chaiHttp);
let token = '';

describe('Ticketing API tests', function () {
    describe('POST/createEvent', () => {
        it('should create a new event and return a 201 status code along with the created event', (done) => {
            chai.request(server)
                .post('api/v1/events/create')
                .send({})
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.an('object');
                    response.body.should.have.property('status').eql('sucess');
                    response.body.should.have.property('data');

                    done();
                });
        });
    });
});
