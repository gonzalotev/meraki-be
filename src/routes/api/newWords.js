const {NewWordController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(NewWordController.fetch)
        .post(NewWordController.create);
    router.route('/:id')
        .get(NewWordController.find)
        .put(NewWordController.update)
        .delete(NewWordController.delete);
    return router;
};
