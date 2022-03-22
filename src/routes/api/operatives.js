const {OperativesController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(OperativesController.fetch)
        .post(OperativesController.create);
    router.route('/downloadCsv').get(OperativesController.downloadCsv);
    router.get('/match/:word', OperativesController.findMatch);
    router.route('/:operativeId')
        .get(OperativesController.find)
        .delete(OperativesController.delete)
        .put(OperativesController.update);
    return router;
};
