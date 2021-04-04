const {DocumentTypeController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(DocumentTypeController.fetch)
        .post(DocumentTypeController.create);
    router.route('/:id')
        .get(DocumentTypeController.find)
        .put(DocumentTypeController.update)
        .delete(DocumentTypeController.delete);
    return router;
};
