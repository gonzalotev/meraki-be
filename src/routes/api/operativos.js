const {OperativosController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(OperativosController.fetch)
        .post(OperativosController.create)
        .put(OperativosController.update)
        .delete(OperativosController.delete);
    router.route('/:DESCRIPCION/:ID_OPERATIVO/:ID_FUENTE')
        .get(OperativosController.fetchOne);
    return router;
};
