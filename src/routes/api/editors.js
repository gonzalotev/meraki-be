const { EditorsController } = include('controllers');

module.exports = router => {
    router.route('/')
        .get(EditorsController.fetch)
        .post(EditorsController.create);
    router.route('/:id')
        .put(EditorsController.update)
        .get(EditorsController.find)
        .delete(EditorsController.delete);
    return router;
};
