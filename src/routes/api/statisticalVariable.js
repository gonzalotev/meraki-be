const {StatisticalVariableController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(StatisticalVariableController.fetch)
        .post(StatisticalVariableController.create);
    router.route('/:id/')
        .put(StatisticalVariableController.update)
        .delete(StatisticalVariableController.delete)
        .get(StatisticalVariableController.fetchOne);

    return router;
};
