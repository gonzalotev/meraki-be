const {OperativesController} = include('controllers');

module.exports = router => {
    router.route('/').get(OperativesController.fetch);
    return router;
};
