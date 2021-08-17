const {DocumentsController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(DocumentsController.fetch)
        .post(DocumentsController.create);
    router.route('/downloadCsv').get(DocumentsController.downloadCsv);
    router.route('/:documentId')
        .get(DocumentsController.find)
        .put(DocumentsController.update)
        .delete(DocumentsController.delete);
    return router;
};
