const { UserRoleController } = include('controllers');

module.exports = router => {
    router.route('/')
        .get(UserRoleController.fetch)
        .post(UserRoleController.create);
    router.route('/:userId/:roleId')
        .put(UserRoleController.update)
        .delete(UserRoleController.delete);
    return router;
};
