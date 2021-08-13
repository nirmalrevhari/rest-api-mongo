let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
let server = require('./../app');

let inputSize = 100;
const input = [];
for (let i = 0; i < inputSize; i++) {
    input.push({
        "startDate": "2016-12-19",
        "endDate": "2018-02-02",
        "minCount": 2700,
        "maxCount": 3000
    });
}
describe('Podcast', () => {
    describe('/POST media', () => {
        it('should send parameters to : /api/records POST', (done) => {
            chai.request(server)
                .post('/api/records')
                .send(input)
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.code).should.be.eql(0);
                    done();
                });
        });
    });
})