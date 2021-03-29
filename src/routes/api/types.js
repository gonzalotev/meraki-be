const {ChatTypeController, NetTypeController, RelationTypeController} = include('controllers');

module.exports = router => {
    router.route('/chats')
        .get(ChatTypeController.fetch)
        .post(ChatTypeController.create);
    router.route('/chats/:id')
        .get(ChatTypeController.find)
        .put(ChatTypeController.update)
        .delete(ChatTypeController.delete);
    router.route('/nets')
        .get(NetTypeController.fetch)
        .post(NetTypeController.create);
    router.route('/nets/:id')
        .get(NetTypeController.find)
        .put(NetTypeController.update)
        .delete(NetTypeController.delete);
    router.route('/relations')
        .get(RelationTypeController.fetch)
        .post(RelationTypeController.create);
    router.route('/relations/:id')
        .get(RelationTypeController.find)
        .put(RelationTypeController.update)
        .delete(RelationTypeController.delete);
    return router;
};
