const { AuthController } = require('../../controllers');

module.exports = router => {
    router.post('/', AuthController.getSessionUser);
    return router;
};
