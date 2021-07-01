const {DocumentTypeController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(DocumentTypeController.fetch)
        .post(DocumentTypeController.create);
    router.route('/downloadCsv').get(DocumentTypeController.downloadCsv);
    router.route('/:id')
        .get(DocumentTypeController.find)
        .put(DocumentTypeController.update)
        .delete(DocumentTypeController.delete);
    return router;
};
