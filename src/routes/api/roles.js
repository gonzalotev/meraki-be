const { RolesController } = include('controllers');

module.exports = router => {
    router.route('/')
        .get(RolesController.fetch)
        .post(RolesController.create);

    router.route('/:id')
        .put(RolesController.update)
        .get(RolesController.find)
        .delete(RolesController.delete);

    return router;
};
