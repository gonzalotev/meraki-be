const {StepsLinguisticProcessesController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(StepsLinguisticProcessesController.fetch)
        .post(StepsLinguisticProcessesController.create);
    router.route('/downloadCsv').get(StepsLinguisticProcessesController.downloadCsv);
    router.route('/:sourceId/:questionId/:order/:encodingProcessId')
        .get(StepsLinguisticProcessesController.find)
        .delete(StepsLinguisticProcessesController.delete)
        .put(StepsLinguisticProcessesController.update);
    return router;
};
