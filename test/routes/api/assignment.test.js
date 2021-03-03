const {
    request,
    Sinon
} = require('..');

const {ArqService} = include('services');
const {Assignment} = include('models');

describe('api/assignment', () => {
    let token;
    let tokenValidation;
    let fakeAssignment;

    beforeEach(() => {
        token = 'Bearer fake-token';
        tokenValidation = {
            success: true,
            message: null,
            tokenExpired: null,
            user: {
                name: 'fake-name',
                surname: 'fake-surname',
                roles: ['cn'],
                email: 'fake-email@fake.com',
                deleted: false,
                id: '00000000-0000-0000-0000-000000000000',
                documentId: 'fake-document',
                assignment: {stateId: '30'},
                attributes: {
                    stateId: '30',
                    cellphone: 'fake-phone',
                    cuit: 'fake-cuit'
                }
            }
        };
        Sinon.stub(ArqService, 'validateToken').returns(Promise.resolve(tokenValidation));
    });

    afterEach(() => {
        ArqService.validateToken.restore();
    });

    describe('fetchAssignments', () => {
        beforeEach(() => {
            fakeAssignment = [{
                state: 6,
                ups: 1,
                area: 714,
                segment: 3,
                dwellings: 2
            }];
        });

        afterEach(() => {
            Assignment.fetchAssignments.restore();
        });

        it('should return assignments', done => {
            request
                .get('/api/assignment?state=6')
                .set('Authorization', token)
                .expect(200)
                .end((err, res) => {
                    res.body.should.have.property('assignments').which.is.an.Array();
                    res.body.assignments.should.be.deepEqual(fakeAssignment);
                    done();
                });
        });
    });
});
