const { AuthController } = require('../../controllers');

module.exports = router => {
    router.post('/login', AuthController.login);
    router.post('/register', AuthController.register);
    router.post('/recoveryPassword', AuthController.recoveryPassword);
    router.post('/resetPassword', AuthController.resetPassword);
    return router;
};
