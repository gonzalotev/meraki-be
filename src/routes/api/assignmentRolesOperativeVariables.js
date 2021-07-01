const {AssignmentRolesOperativeVariableController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(AssignmentRolesOperativeVariableController.fetch)
        .post(AssignmentRolesOperativeVariableController.create);
    router.route('/downloadCsv').get(AssignmentRolesOperativeVariableController.downloadCsv);
    router.route('/:id')
        .get(AssignmentRolesOperativeVariableController.find)
        .put(AssignmentRolesOperativeVariableController.update)
        .delete(AssignmentRolesOperativeVariableController.delete);
    return router;
};
