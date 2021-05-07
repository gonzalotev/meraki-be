const {WordsDictionaryController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(WordsDictionaryController.fetch)
        .post(WordsDictionaryController.create);
    router.route('/:word')
        .get(WordsDictionaryController.find)
        .delete(WordsDictionaryController.delete)
        .put(WordsDictionaryController.update);
    return router;
};
