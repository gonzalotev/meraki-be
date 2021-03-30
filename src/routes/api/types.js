const {
    ChatTypeController,
    NetTypeController,
    RelationTypeController,
    DictionaryTypeController,
    DocumentTypeController
} = include('controllers');

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
    router.route('/dictionaries')
        .get(DictionaryTypeController.fetch)
        .post(DictionaryTypeController.create);
    router.route('/dictionaries/:id')
        .get(DictionaryTypeController.find)
        .put(DictionaryTypeController.update)
        .delete(DictionaryTypeController.delete);
    router.route('/documents')
        .get(DocumentTypeController.fetch)
        .post(DocumentTypeController.create);
    router.route('/documents/:id')
        .get(DocumentTypeController.find)
        .put(DocumentTypeController.update)
        .delete(DocumentTypeController.delete);
    return router;
};
