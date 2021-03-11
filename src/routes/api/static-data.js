const { StaticDataController } = include('controllers');

module.exports = router => {
    router.route('/').get(StaticDataController.fetch);
    return router;
};
