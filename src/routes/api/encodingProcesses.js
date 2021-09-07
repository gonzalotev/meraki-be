const {EncodingProcessesController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(EncodingProcessesController.fetch)
        .post(EncodingProcessesController.create);
    router.route('/downloadCsv').get(EncodingProcessesController.downloadCsv);
    router.route('/:id')
        .get(EncodingProcessesController.find)
        .put(EncodingProcessesController.update)
        .delete(EncodingProcessesController.delete);
    return router;
};
