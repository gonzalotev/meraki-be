const { RoleController } = include('controllers');

module.exports = router => {
    router.route('/')
        .get(RoleController.fetch)
        .post(RoleController.create);
    return router;
};
