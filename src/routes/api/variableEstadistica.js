const {VariableEstadisticaController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(VariableEstadisticaController.fetch)
        .post(VariableEstadisticaController.create)
        .put(VariableEstadisticaController.update)
        .delete(VariableEstadisticaController.delete);
    router.route('/:NOMBRE/:ID_VARIABLE/')
        .get(VariableEstadisticaController.fetchOne);
    return router;
};
