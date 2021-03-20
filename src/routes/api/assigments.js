const { AssigmentController } = include('controllers');

module.exports = router => {
    router.route('/')
        .post(AssigmentController.create)
        .put(AssigmentController.update)
        .delete(AssigmentController.delete);
    router.route('/:userId').get(AssigmentController.find);
    return router;
};
