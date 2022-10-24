const {RoleController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(RoleController.fetch);
    return router;
};
