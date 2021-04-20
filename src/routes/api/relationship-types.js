const {RelationshipTypeController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(RelationshipTypeController.fetch)
        .post(RelationshipTypeController.create);
    router.route('/:id')
        .get(RelationshipTypeController.find)
        .put(RelationshipTypeController.update)
        .delete(RelationshipTypeController.delete);
    return router;
};