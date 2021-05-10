const {AutoPhrasesController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(AutoPhrasesController.fetch)
        .post(AutoPhrasesController.create);
    router.route('/:id')
        .get(AutoPhrasesController.find)
        .put(AutoPhrasesController.update)
        .delete(AutoPhrasesController.delete);
    return router;
};
