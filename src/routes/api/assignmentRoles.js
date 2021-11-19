const {AssignmentRoleController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(AssignmentRoleController.fetch)
        .post(AssignmentRoleController.create);
    router.route('/disabled')
        .get(AssignmentRoleController.fetchDisabled);
    router.route('/downloadCsv').get(AssignmentRoleController.downloadCsv);
    router.route('/roles').get(AssignmentRoleController.getRoles);
    router.route('/:roleId/:userId')
        .get(AssignmentRoleController.find)
        .put(AssignmentRoleController.update)
        .delete(AssignmentRoleController.delete);
    return router;
};
