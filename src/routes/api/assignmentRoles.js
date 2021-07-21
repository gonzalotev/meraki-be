const {AssignmentRoleController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(AssignmentRoleController.fetch)
        .post(AssignmentRoleController.create);
    router.route('/downloadCsv').get(AssignmentRoleController.downloadCsv);
    router.route('/:id/:idUser')
        .get(AssignmentRoleController.find)
        .put(AssignmentRoleController.update)
        .delete(AssignmentRoleController.delete);
    return router;
};
