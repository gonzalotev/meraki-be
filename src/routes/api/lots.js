const {LotsController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(LotsController.fetch)
        .post(LotsController.create);
    router.route('/:id')
        .get(LotsController.fetchOne)
        .put(LotsController.update)
        .delete(LotsController.delete);
    return router;
};
