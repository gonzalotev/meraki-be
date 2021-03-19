const { StatisticalVariableController } = include('controllers');

module.exports = router => {
    router.route('/').get(StatisticalVariableController.fetch);
    router.route('/:userId/:variableId').get(StatisticalVariableController.fetchOne);
    return router;
};
