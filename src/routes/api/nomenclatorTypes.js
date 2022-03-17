const { NomenclatorTypesController } = include('controllers');

module.exports = router => {
    router.route('/')
        .get(NomenclatorTypesController.fetch)
        .post(NomenclatorTypesController.create);
    router.route('/downloadCsv').get(NomenclatorTypesController.downloadCsv);
    router.route('/:id')
        .get(NomenclatorTypesController.find)
        .put(NomenclatorTypesController.update)
        .delete(NomenclatorTypesController.delete);
    return router;
};
