const {
    request,
    Sinon
} = require('..');

const { ArqService, RoleTypeService } = include('services');

describe('api/static-data', () => {
    let token;
    let tokenValidation;
    let fakeRoles;

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

    describe('fetchRoles', () => {
        beforeEach(() => {
            fakeRoles = [
                {
                    id: 'AUDITOR',
                    description: 'Auditor description',
                    observation: 'Auditor observation',
                    domain: 'Auditor domain',
                    createdAt: '2021-03-15',
                    deletedAt: null,
                    userCreator: 1,
                    userDestroyer: null
                },
                {
                    id: 'SUPERVISOR',
                    description: 'Supervisor description',
                    observation: 'Supervisor observation',
                    domain: 'Supervisor domain',
                    createdAt: '2021-03-15',
                    deletedAt: '2021-03-16',
                    userCreator: 1,
                    userDestroyer: 2
                }
            ];
            Sinon.stub(RoleTypeService, 'find').returns(Promise.resolve(fakeRoles));
        });
        afterEach(() => {
            RoleTypeService.find.restore();
        });
        it('should return roles types', done => {
            request
                .get('/api/static-data?role=true')
                .set('Authorization', token)
                .expect(200)
                .end((err, res) => {
                    res.body.should.have.property('roles').which.is.an.Array();
                    res.body.roles.should.be.deepEqual(fakeRoles);
                    done();
                });
        });
    });
});
