const { RoleController } = include('controllers');

module.exports = router => {
    router.route('/')
        .get(RoleController.fetch)
        .post(RoleController.create);
    router.route('/:id')
        .put(RoleController.update)
        .get(RoleController.find)
        .delete(RoleController.delete);
    return router;
};
