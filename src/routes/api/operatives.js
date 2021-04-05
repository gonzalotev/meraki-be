const {OperativesController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(OperativesController.fetch)
        .post(OperativesController.create)
        .put(OperativesController.update)
        // .delete(OperativesController.delete);
    // router.route('/:DESCRIPCION/:ID_OPERATIVO/:ID_FUENTE')
    //     .get(OperativesController.fetchOne);
    return router;
};
