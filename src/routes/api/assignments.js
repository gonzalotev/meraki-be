const { AssignmentsController } = include('controllers');

module.exports = router => {
    router.route('/')
        .post(AssignmentsController.create)
        .put(AssignmentsController.update)
        .delete(AssignmentsController.delete)
        .get(AssignmentsController.fetchSessionAssigment);
    router.route('/:userId').get(AssignmentsController.find);

    return router;
};
