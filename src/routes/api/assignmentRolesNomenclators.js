const {AssignmentRolesNomenclatorController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(AssignmentRolesNomenclatorController.fetch)
        .post(AssignmentRolesNomenclatorController.create);
    router.route('/:id')
        .get(AssignmentRolesNomenclatorController.find)
        .put(AssignmentRolesNomenclatorController.update)
        .delete(AssignmentRolesNomenclatorController.delete);
    return router;
};
