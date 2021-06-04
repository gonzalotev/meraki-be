const {AssignmentRoleController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(AssignmentRoleController.fetch)
        .post(AssignmentRoleController.create);
    router.route('/:id')
        .get(AssignmentRoleController.find)
        .put(AssignmentRoleController.update)
        .delete(AssignmentRoleController.delete);
    return router;
};
