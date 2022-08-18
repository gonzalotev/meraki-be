const {RoleController} = include('controllers');
const {permission} = include('routes/middlewares');

module.exports = router => {
    router.route('/').get(permission(['admin']), RoleController.fetch);
    return router;
};
