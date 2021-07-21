const { OperativeStructureController } = include('controllers');

module.exports = router => {
    router.route('/')
        .get(OperativeStructureController.fetch)
        .post(OperativeStructureController.create);
    router.route('/downloadCsv').get(OperativeStructureController.downloadCsv);
    router.route('/:operativeId/:structureId')
        .put(OperativeStructureController.update)
        .get(OperativeStructureController.find)
        .delete(OperativeStructureController.delete);
    return router;
};
