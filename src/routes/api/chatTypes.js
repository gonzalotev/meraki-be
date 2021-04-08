const {ChatTypeController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(ChatTypeController.fetch)
        .post(ChatTypeController.create);
    router.route('/:id')
        .get(ChatTypeController.find)
        .put(ChatTypeController.update)
        .delete(ChatTypeController.delete);
    return router;
};
