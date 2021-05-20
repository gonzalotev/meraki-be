const {NewWordController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(NewWordController.fetch)
        .post(NewWordController.create);
    router.route('/:operative/:variable').get(NewWordController.findFirst);
    router.route('/:id')
        .get(NewWordController.find)
        .put(NewWordController.update)
        .delete(NewWordController.delete);
    return router;
};
