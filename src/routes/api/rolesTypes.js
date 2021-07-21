const {RolesTypeController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(RolesTypeController.fetch)
        .post(RolesTypeController.create);
    router.route('/downloadCsv').get(RolesTypeController.downloadCsv);
    router.route('/:id')
        .get(RolesTypeController.find)
        .put(RolesTypeController.update)
        .delete(RolesTypeController.delete);
    return router;
};
