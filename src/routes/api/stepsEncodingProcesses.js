const {StepsEncodingProcessesController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(StepsEncodingProcessesController.fetch)
        .post(StepsEncodingProcessesController.create);
    router.route('/downloadCsv').get(StepsEncodingProcessesController.downloadCsv);
    router.route('/:sourceId/:questionId')
        .get(StepsEncodingProcessesController.find)
        .delete(StepsEncodingProcessesController.delete)
        .put(StepsEncodingProcessesController.update);
    return router;
};
