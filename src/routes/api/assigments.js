const { AssigmentController } = include('controllers');

module.exports = router => {
    router.route('/').post(AssigmentController.create);
    return router;
};
