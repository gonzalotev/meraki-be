const {AssignmentRolesNomenclatorController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(AssignmentRolesNomenclatorController.fetch)
        .post(AssignmentRolesNomenclatorController.create);
    router.route('/disabled')
        .get(AssignmentRolesNomenclatorController.fetchDisabled);
    router.route('/downloadCsv').get(AssignmentRolesNomenclatorController.downloadCsv);
    router.route('/roles').get(AssignmentRolesNomenclatorController.getRoles);
    router.route('/:id/:userId/:nomenclatorId')
        .get(AssignmentRolesNomenclatorController.find)
        .put(AssignmentRolesNomenclatorController.update)
        .delete(AssignmentRolesNomenclatorController.delete);
    return router;
};
