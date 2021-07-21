const {StaticalVariableController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(StaticalVariableController.fetch)
        .post(StaticalVariableController.create);
    router.route('/downloadCsv').get(StaticalVariableController.downloadCsv);
    router.route('/:id')
        .get(StaticalVariableController.find)
        .put(StaticalVariableController.update)
        .delete(StaticalVariableController.delete);
    return router;
};
