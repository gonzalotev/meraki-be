const {OperativesController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(OperativesController.fetch)
        .post(OperativesController.create)
        .put(OperativesController.update)
        .delete(OperativesController.delete);

    return router;
};
