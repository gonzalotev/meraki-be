const {VariableOperatingRoleController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(VariableOperatingRoleController.fetch)
        .post(VariableOperatingRoleController.create)
        .put(VariableOperatingRoleController.update)
        .delete(VariableOperatingRoleController.delete);
    router.route('/:ID_ROL_USUARIO/:OBSERVACION/:ID_VARIABLE')
        .get(VariableOperatingRoleController.fetchOne);
    return router;
};
