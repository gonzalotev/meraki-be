const {OrganizationTypeController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(OrganizationTypeController.fetch)
        .post(OrganizationTypeController.create);
    router.route('/:id')
        .get(OrganizationTypeController.find)
        .put(OrganizationTypeController.update)
        .delete(OrganizationTypeController.delete);
    return router;
};
