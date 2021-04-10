const {ClassifierTypeController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(ClassifierTypeController.fetch)
        .post(ClassifierTypeController.create);
    router.route('/:id')
        .get(ClassifierTypeController.find)
        .put(ClassifierTypeController.update)
        .delete(ClassifierTypeController.delete);
    return router;
};
