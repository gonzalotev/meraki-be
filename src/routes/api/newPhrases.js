const {NewPhraseController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(NewPhraseController.fetch)
        .post(NewPhraseController.create);
    router.route('/:id')
        .get(NewPhraseController.find)
        .put(NewPhraseController.update)
        .delete(NewPhraseController.delete);
    return router;
};
