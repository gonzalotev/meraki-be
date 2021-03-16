const { UserRoleController } = include('controllers');

module.exports = router => {
    router.route('/').get(UserRoleController.fetch);
    return router;
};
