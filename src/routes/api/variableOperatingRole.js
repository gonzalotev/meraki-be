const {VariableOperatingRoleController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(VariableOperatingRoleController.fetch)
        .post(VariableOperatingRoleController.create)
        .put(VariableOperatingRoleController.update)
        .delete(VariableOperatingRoleController.delete);

    return router;
};
