const { NomenclatorTypesController } = include('controllers');

module.exports = router => {
    router.route('/')
        .get(NomenclatorTypesController.fetchStaticNomenclatorTypes)
        .post(NomenclatorTypesController.create);
    router.route('/downloadCsv').get(NomenclatorTypesController.downloadCsv);
    router.route('/:id')
        .get(NomenclatorTypesController.find)
        .put(NomenclatorTypesController.update)
        .delete(NomenclatorTypesController.delete);
    return router;
};
