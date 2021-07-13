const {StepsEncodingProcesses} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(StepsEncodingProcesses.fetch)
        .post(StepsEncodingProcesses.create);
    router.route('/downloadCsv').get(StepsEncodingProcesses.downloadCsv);
    router.route('/:sourceId/:questionId')
        .get(StepsEncodingProcesses.find)
        .delete(StepsEncodingProcesses.delete)
        .put(StepsEncodingProcesses.update);
    return router;
};
