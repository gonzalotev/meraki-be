const {RolOperativoVariableController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(RolOperativoVariableController.fetch)
        .post(RolOperativoVariableController.create)
        .put(RolOperativoVariableController.update)
        .delete(RolOperativoVariableController.delete);
    router.route('/:ID_ROL_USUARIO/:OBSERVACION/:ID_VARIABLE')
        .get(RolOperativoVariableController.fetchOne)
    return router;
};
