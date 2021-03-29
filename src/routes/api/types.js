const { ChatTypeController } = include('controllers');

module.exports = router => {
    router.route('/chat')
        .get(ChatTypeController.fetch)
        .post(ChatTypeController.create);
    router.route('/chat/:id')
        .get(ChatTypeController.find)
        .put(ChatTypeController.update)
        .delete(ChatTypeController.delete);

    return router;
};
