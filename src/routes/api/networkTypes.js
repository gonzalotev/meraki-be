const {NetworkTypeController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(NetworkTypeController.fetch)
        .post(NetworkTypeController.create);
    router.route('/:id')
        .get(NetworkTypeController.find)
        .put(NetworkTypeController.update)
        .delete(NetworkTypeController.delete);
    return router;
};