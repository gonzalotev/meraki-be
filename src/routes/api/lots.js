const {LotsController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(LotsController.fetch)
        .post(LotsController.validateFile, LotsController.create, LotsController.saveLotFile);
    router.route('/:id')
        .get(LotsController.fetchOne)
        .put(LotsController.validateFile, LotsController.update, LotsController.saveLotFile)
        .delete(LotsController.delete);
    return router;
};
