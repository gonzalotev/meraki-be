const {OperativeSourcesController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(OperativeSourcesController.fetch)
        .post(OperativeSourcesController.create);
    router.route('/:sourceId')
        .get(OperativeSourcesController.find)
        .delete(OperativeSourcesController.delete)
        .put(OperativeSourcesController.update);
    return router;
};
