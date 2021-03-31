const {RelationTypeController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(RelationTypeController.fetch)
        .post(RelationTypeController.create);
    router.route('/:id')
        .get(RelationTypeController.find)
        .put(RelationTypeController.update)
        .delete(RelationTypeController.delete);
    return router;
};
