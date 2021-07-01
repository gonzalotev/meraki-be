const {NomenclatorSubtypesController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(NomenclatorSubtypesController.fetch)
        .post(NomenclatorSubtypesController.create);
    router.route('/:id/:typeId')
        .get(NomenclatorSubtypesController.find)
        .delete(NomenclatorSubtypesController.delete)
        .put(NomenclatorSubtypesController.update);
    return router;
};
