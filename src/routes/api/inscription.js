const {InscriptionController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(InscriptionController.fetch);
    router.route('/:id')
        .delete(InscriptionController.delete);
    router.get('/download', InscriptionController.downloadExcel);
    return router;
};
