const {EditorController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(EditorController.fetch)
        .post(EditorController.create);
    router.route('/:id')
        .get(EditorController.find)
        .put(EditorController.update)
        .delete(EditorController.delete);
    return router;
};
