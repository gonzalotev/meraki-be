const {StaticDataController} = include('controllers');

module.exports = router => {
    router.route('/')
        .post(StaticDataController.create);
    return router;
};
