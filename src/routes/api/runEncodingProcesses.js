const {RunEncodingProcessesController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(RunEncodingProcessesController.fetch)
        .post(RunEncodingProcessesController.create);
    router.route('/downloadCsv').get(RunEncodingProcessesController.downloadCsv);
    router.route('/:sourceId/:questionId/:order/:encodingProcessId')
        .get(RunEncodingProcessesController.find)
        .delete(RunEncodingProcessesController.delete)
        .put(RunEncodingProcessesController.update);
    return router;
};
