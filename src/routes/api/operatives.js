const {OperativesController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(OperativesController.fetch)
        .post(OperativesController.create);
    router.route('/:id')
        .get(OperativesController.find)
        .put(OperativesController.update);
    return router;
};
