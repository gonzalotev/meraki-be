const {StatisticalVariableController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(StatisticalVariableController.fetch)
        .post(StatisticalVariableController.create)
        .put(StatisticalVariableController.update)
        .delete(StatisticalVariableController.delete);
    router.route('/:NOMBRE/:ID_VARIABLE/')
        .get(StatisticalVariableController.fetchOne);
    return router;
};
