const {OperativeSourcesController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(OperativeSourcesController.fetch)
        .post(OperativeSourcesController.create);
    router.route('/:operativeSource')
        .get(OperativeSourcesController.find)
        .delete(OperativeSourcesController.delete)
        .put(OperativeSourcesController.update);
    return router;
};
