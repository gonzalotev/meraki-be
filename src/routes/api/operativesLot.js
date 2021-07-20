const {OperativeLotController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(OperativeLotController.fetch)
        .post(OperativeLotController.create);
    router.route('/downloadCsv').get(OperativeLotController.downloadCsv);
    router.route('/:id')
        .get(OperativeLotController.find)
        .put(OperativeLotController.update)
        .delete(OperativeLotController.delete);
    return router;
};
