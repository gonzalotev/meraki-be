const {OperativesController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(OperativesController.fetch)
        .post(OperativesController.create);
    router.route('/:sourceId')
        .get(OperativesController.find)
        .delete(OperativesController.delete)
        .put(OperativesController.update);
    return router;
};
