const {NetTypeController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(NetTypeController.fetch)
        .post(NetTypeController.create);
    router.route('/:id')
        .get(NetTypeController.find)
        .put(NetTypeController.update)
        .delete(NetTypeController.delete);
    return router;
};
