const { StaticController } = include('controllers');

module.exports = router => {
    router.route('/').get(StaticController.fetch);
    return router;
};
