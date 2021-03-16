const {
    request,
    Sinon
} = require('..');

const { ArqService, UserRoleService } = include('services');

describe('api/user-role', () => {
    let token;
    let tokenValidation;
    let fakeUserRoles;

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

    describe('fetch user and role', () => {
        beforeEach(() => {
            fakeUserRoles = [
                {
                    id_user: 1,
                    id_role: 'AUDITOR',
                    description: 'auditor description',
                    domain: 'auditor domain',
                    observation: 'auditor observation',
                    createdAt: '2021-03-15',
                    deletedAt: '2021-03-15'
                },
                {
                    id_user: 2,
                    id_role: 'FAKE',
                    description: 'fake description',
                    domain: 'fake domain',
                    observation: 'fake observation',
                    createdAt: '2021-03-15',
                    deletedAt: null
                }
            ];
            Sinon.stub(UserRoleService, 'find').returns(Promise.resolve(fakeUserRoles));
        });
        afterEach(() => {
            UserRoleService.find.restore();
        });
        it('should return users and roles', done => {
            request
                .get('/api/user-role')
                .set('Authorization', token)
                .expect(200)
                .end((err, res) => {
                    res.body.should.have.property('userRoles').which.is.an.Array();
                    res.body.userRoles.should.be.deepEqual(fakeUserRoles);
                    done();
                });
        });
    });
});
